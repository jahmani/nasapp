import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Person, Extended, ExtMap } from 'src/app/interfaces/data-models';
import { Observable } from 'rxjs';
import { MapToTreeService } from 'src/app/providers/map-to-tree.service';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss'],
})
export class FamilyComponent implements OnInit {
  nullRoot$: Observable<Extended<Person>>;
  people$: Observable<Extended<Person>[]>;

  constructor(private db: AngularFirestore, private mapToTree: MapToTreeService) { }

  ngOnInit() {
    // this.people$ = this.db.collection('people').snapshotChanges().pipe(map(
    //   (list: DocumentChangeAction<Person>[]) => {
    //     const all = (list.map(item =>
    //       ({ data: item.payload.doc.data(), id: item.payload.doc.id, ext: {} } as Extended<Person>)));
    //     const  newMap = new ExtMap<Extended<Person>>();
    //     const peopleMap = all.reduce<ExtMap<Extended<Person>>>((prev, curr) => {
    //        prev.set(curr.id, curr);
    //        return prev;
    //       }, newMap);
    //     const peopleTree = this.mapToTree.convert(peopleMap);
    //     return peopleTree;
    //   }
    // ));
    this.nullRoot$ = this.db.collection('people').snapshotChanges().pipe(map(
      (list: DocumentChangeAction<Person>[]) => {
        const all = (list.map(item =>
          ({ data: item.payload.doc.data(), id: item.payload.doc.id, ext: {} } as Extended<Person>)));
        const  newMap = new ExtMap<Extended<Person>>();
        const peopleMap = all.reduce<ExtMap<Extended<Person>>>((prev, curr) => {
           prev.set(curr.id, curr);
           return prev;
          }, newMap);
        const peopleTree = this.mapToTree.convert(peopleMap);
        return peopleTree;
      }
    ));
  }
}
