import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from '../subject/component/subject.component';
import { StudentComponent } from '../student/student.component';

const routes: Routes = [{ path: '', component: SubjectComponent }, {path: '', component: StudentComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
