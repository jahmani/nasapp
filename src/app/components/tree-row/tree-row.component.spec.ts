import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeRowComponent } from './tree-row.component';

describe('TreeRowComponent', () => {
  let component: TreeRowComponent;
  let fixture: ComponentFixture<TreeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeRowComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
