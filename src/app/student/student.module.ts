import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student_routing.module';
import { StudentComponent } from './student.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }