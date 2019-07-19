import { Component, AfterViewInit, ViewChild, OnInit, ViewChildren, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
// import Swiper from 'swiper';
import { IonSlides, IonSlide } from '@ionic/angular';
import { Person, Extended } from 'src/app/interfaces/data-models';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators/';
// import * as Swiper from 'swiper/dist/js/swiper.js';

@Component({
  selector: 'app-swiper-row',
  templateUrl: './swiper-row.component.html',
  styleUrls: ['./swiper-row.component.scss'],
})
export class SwiperRowComponent implements OnInit, AfterViewInit {

  @ViewChild(IonSlides) slides: IonSlides;
  @ViewChild('childSlides') childSlides: IonSlides;
  // @Output() childeSlideChange = new EventEmitter<number>();
  @ViewChildren(IonSlide) slideColl: IonSlide[];
  @Input() isRoot: boolean;
  @Input() people: Extended<Person>[];
  lParent: Extended<Person>;
  showOption: boolean;
  lAddNew: any;
  // private  activeIndex$: Observable<number>; // = from(this.slides.getActiveIndex());
  // activePerson$: Observable<Extended<Person>>; // = this.activeIndex$.pipe(map(index => this.people[index]));
  // canProg = true; // : boolean;
  prevChildIndex: number;

  @Input() set parent(val: Extended<Person>) {
    this.lParent = val;
    this.people = this.lParent.ext.sons;
  }
  addSon = false;

  //   people$: Observable<Extended<Person>[]>;
  activeIndex = 0;
  nestedOpts = {
  //  nested: true
  };
  slidesOpts = {
    slidesPerView: 4,
    centeredSlides: true,
    resistance: true,
     resistanceRatio : 0,
    nested: true,

    spaceBetween: 5,
    on: {
      beforeInit() {
        const swiper = this;

        //   swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        //  swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        // swiper.params.watchSlidesProgress = true;
        // swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const slides = this.slides;
        const maxScale = 1.2;
        const slideCount = slides.length;
        const slideDelta = 1 / (slideCount - 1);
        const centerX = this.progress;
        const slope = (maxScale - 1) / slideDelta;

        for (let i = 0, length = slides.length; i < length; i += 1) {
          const slideX = i * slideDelta;
          let slideScale = 1;
          if (slideX > centerX - slideDelta) {
            if (slideX <= centerX) {
              slideScale += (slideX - (centerX - slideDelta)) * slope;
            } else if (slideX < centerX + slideDelta) {
              slideScale += ((centerX + slideDelta) - slideX) * slope;
            }
          }
          this.slides[i].style.transform = `scale(${slideScale})`;

        }
      }
    }
  };
  get activePerson(): Extended<Person> {
    // return this.activeIndex$;
     return this.people && this.people[this.activeIndex];
  }

  constructor(private db: AngularFirestore, private cd: ChangeDetectorRef) {

  }
  async onSlideChange(childSlide?: IonSlides) {
    this.activeIndex = await this.slides.getActiveIndex();
    // this.activePerson = this.people[this.activeIndex];
    console.log('slide index: ', this.activeIndex);
    this.activePerson.ext.addNew = false;
    this.showOption = false;
    if (this.childSlides ) {
      this.childSlides.slideTo(this.activeIndex);
      this.prevChildIndex = this.activeIndex;
    }
  }


  async onChildSlideChange($event: CustomEvent) {
    console.log($event);
    $event.stopPropagation();

    const childIndex = await this.childSlides.getActiveIndex();
    if (childIndex !== this.prevChildIndex) {
      this.slides.slideTo(childIndex);

      // this.childeSlideChange.emit(childIndex);

    }
  }
  ngAfterViewInit() {
  }
  async ngOnInit() {

  }
  showAddNew(val: boolean, $event: CustomEvent) {
    $event.stopPropagation();
    this.activePerson.ext.addNew = val;
    // this.lAddNew = val;

    // this.people = this.lParent.ext.sons;
  }
  onPersonClick(i) {
    if (i !== this.activeIndex) {
      this.slides.slideTo(i);
    } else {
      this.showOption = !this.showOption;
    }
  }
  removePerson(i, $event) {
    this.db.collection('people').doc(this.activePerson.id).delete();
    this.cd.detectChanges();
    // ($event.target as any).value = '';
  }
  onInputBlur($event: CustomEvent) {
    console.log(($event.target as any).value);
    const name = ($event.target as any).value;
    if (name) {
      this.db.collection('people').add({ name, parentId: this.lParent ? this.lParent.id : null });
      ($event.target as any).value = '';
    }
  }

}
