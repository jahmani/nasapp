import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { TreeRowComponent } from '../components/tree-row/tree-row.component';
import { SwiperRowComponent } from '../components/swiper-row/swiper-row.component';
import { FamilyComponent } from '../components/family/family.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [Tab2Page, TreeRowComponent, SwiperRowComponent, FamilyComponent]
})
export class Tab2PageModule {}
