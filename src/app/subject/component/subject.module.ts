import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectRoutingModule } from '../subject-routing.module';
import { SubjectComponent } from './subject.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SubjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SubjectRoutingModule
  ]
})
export class SubjectModule { }
