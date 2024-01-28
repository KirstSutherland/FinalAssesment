/**This line imports the HttpClient module from the Angular @angular/common/http package. 
 * HttpClient is used for making HTTP requests. */
import { HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

/**This line imports the Injectable decorator from the Angular @angular/core package. 
 * The Injectable decorator is used to mark a class as available to the dependency injection system. */
import { Injectable } from '@angular/core';

/**import { Observable } from 'rxjs';: This line imports the Observable class from the RxJS library. 
 * Observables are used to handle asynchronous operations and represent a stream of data over time. */
import { Observable } from 'rxjs';

/**This line imports the subject class from the specified path. 
 * A model representing the structure of a subject. */
import { student } from '../model/student.model';


/**This is a decorator applied to the SubjectService class. 
 * It marks the service as injectable and specifies that it should be provided at the root level. 
 * This means that Angular will create a single instance of this service for the entire application. */
@Injectable({
  providedIn: 'root'
})

/**Declaring the SubjectServices class */
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/student';

  /**This is the constructor of the SubjectService class. 
   * It takes an instance of the HttpClient class as a parameter and assigns it to a private property named http.*/
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Array<student>>{

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    /**This line makes an HTTP POST request to the specified URL 'http://localhost:4200/subject' using the HttpClient instance 
     * (this.http). The empty object {} is passed as the request body. 
     * The method returns an Observable that will emit an array of subject objects once the HTTP request is complete. */
    return this.http.get<Array<student>>('http://localhost:3000/student', {headers})
  };


  getSpecificStudent(searchValue:string): Observable<student>{
    const url = `http://localhost:3000/student/${searchValue}`;
    console.log(searchValue);


    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    /**This line makes an HTTP POST request to the specified URL 'http://localhost:4200/subject' using the HttpClient instance 
     * (this.http). The empty object {} is passed as the request body. 
     * The method returns an Observable that will emit an array of subject objects once the HTTP request is complete. */
    const result = this.http.get<student>(url, { headers });
    console.log(result)
    return result
  };

  /** DELETE STUDENT BASED ON STUDENT NAME */
  deleteStudent(deleteInputValue: string): Observable<student> {
    const url = `http://localhost:3000/api/student/${deleteInputValue}`;

    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.delete<student>(url, { headers });
  }

  updateProperty(studentID: string, property: string, newValue: string): Observable<student> {
    const url = `http://localhost:3000/api/student/${studentID}/${property}`;

    const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');

    const body = { newValue: newValue };

    return this.http.put<student>(url, body, { headers });
  }
  
  
  addStudent(newStudentID: string, newFirstName: string, newLastName: string): Observable<student> {
    const payload = { newStudentID, newFirstName, newLastName };
    return this.http.post<any>(this.apiUrl, payload);
  }

  
}