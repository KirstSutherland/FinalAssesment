/**This line imports the Component decorator from the Angular core module. 
 * This decorator is used to define a component in Angular. */
import { Component } from '@angular/core';

/**This imports the SubjectService from the specified path. 
 * The SubjectService provides methods for fetching subjects. */
import { SubjectService } from '../../services/subject.service';

/**This imports the subject class from the specified path. 
 * The subject model represents the structure of a subject. */
import { subject } from '../../model/subject.model';

/**This imports the Observable and Subject classes from the RxJS library. 
 * These are used for handling asynchronous operations and creating observable streams of data. */
import { Observable, Subject } from 'rxjs';

/**This is the Component decorator, and it is used to define metadata for the Angular component. 
 * It specifies the component's selector, templateUrl (HTML file for the component), and styleUrls (CSS file for styling). */
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})

/**Declaring the subject class */
export class SubjectComponent {

  /**This declares a property named subject and initializes it as an empty array of subject objects. 
   * This property will be used to store the subjects fetched from the service. */
  subject: Array<subject> = [];

  /**This is the constructor of the SubjectComponent class. 
   * It takes an instance of SubjectService as a parameter (dependency injection) and initializes the component. */
  constructor( 

    /**In the constructor, it calls the getSubjects method to fetch subjects from the service. 
     * It subscribes to the observable returned by getSubjects and assigns the fetched data to the subject property when the data 
     * is received. */
    private SubjectService: SubjectService )
    {
      this.getSubjects().subscribe((data) => {this.subject = data})
    }

  /**This method calls the getSubjects method from the injected SubjectService. 
   * It returns the observable obtained from the service, which will emit data when the HTTP request is complete. */
  getSubjects(): Observable<any>{
    return this.SubjectService.getSubjects()
  }

}
