import { Component } from '@angular/core';
import { SubjectService } from '../../services/subject.service';
import { Observable, Subject } from 'rxjs';
import { subject } from '../../model/subject.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent {
  subject: Array<subject> = [];

  constructor( 
    private SubjectService: SubjectService )
    {
      this.getSubjects().subscribe((data) => {this.subject = data})
    }


  getSubjects(): Observable<any>{
    return this.SubjectService.getSubjects()
  }

}
