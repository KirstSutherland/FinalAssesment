import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subject } from '../model/subject.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Array<subject>>{
    return this.http.post<Array<subject>>('http:localhost:4200/subject', {})
  };
}
