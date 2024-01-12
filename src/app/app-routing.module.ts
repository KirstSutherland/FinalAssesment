import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubjectComponent } from './subject/component/subject.component';

const routes: Routes = [
  //{ path: 'subject', component: SubjectComponent },
  { path: 'subject', loadChildren: () => import('./subject/component/subject.module').then(m => m.SubjectModule) },
  // Other routes if any
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
