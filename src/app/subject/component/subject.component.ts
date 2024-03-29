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
import { Observable, Subscription } from 'rxjs';
import { Int32 } from 'mongodb';

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
  subjects: Array<subject> = [];
  searchInputValue: string = '';
  deleteInputValue: string = '';
  updateSubject: string = '';
  updateProperty: string = '';
  updateValue: string = '';
  addSubjectName: string = '';
  addTeacherName: string = '';
  //newSubject: subject = {subjectID: new Int32(0), subjectName: this.addSubjectName, teacherName: this.addTeacherName}; // Initial values, you might use a form to get these from the user




  /**This is the constructor of the SubjectComponent class. 
   * It takes an instance of SubjectService as a parameter (dependency injection) and initializes the component. */
  constructor( 
    

    /**In the constructor, it calls the getSubjects method to fetch subjects from the service. 
     * It subscribes to the observable returned by getSubjects and assigns the fetched data to the subject property when the data 
     * is received. */
    private SubjectService: SubjectService )
    {
      this.getSubjects().subscribe((data) => {this.subjects = data})
    }

    search(): void {
      console.log('Search button clicked! Value:', this.searchInputValue);
      this.getSpecificSubject().subscribe(
        (result) => {
          this.subjects = [result]; // Update the subjects array with the new record
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
    }

    delete(): void {
      //const subjectNameToDelete = 'History';
      console.log('Delete button clicked! Value:', this.deleteInputValue);
      this.deleteSpecificSubject().subscribe(
        (result) => {
          this.subjects = [result];
        },
        (error) => {
          console.error(error);
        }
      )
    }

    update(): void {
      console.log('Subject updated:', this.updateSubject);
      console.log('Property updated:', this.updateProperty);
      console.log('New property value:', this.updateValue);
      this.updateSubjectProperty().subscribe(
        (result) => {
            this.subjects = [result];
        },
        (error) => {
            console.error(error);
            // Handle error
        }
    );
    }

    add(): void {
      console.log('Subject updated:', this.addSubjectName);
      console.log('Property updated:', this.addTeacherName);
      this.addSubject().subscribe(
        (result) => {
          console.log('Subject added successfully:', result);
        },
        (error) => {
          console.error('Error adding subject:', error);
        }
      );
    }

  /**This method calls the getSubjects method from the injected SubjectService. 
   * It returns the observable obtained from the service, which will emit data when the HTTP request is complete. */
  getSubjects(): Observable<Array<subject>>{
    return this.SubjectService.getSubjects()
  }

  getSpecificSubject(): Observable<subject>{
    return this.SubjectService.getSpecificSubject(this.searchInputValue);
  }

  deleteSpecificSubject(): Observable<subject>{
    return this.SubjectService.deleteSubject(this.deleteInputValue);
  }

  updateSubjectProperty(): Observable<subject>{
    return this.SubjectService.updateProperty(this.updateSubject, this.updateProperty, this.updateValue);
  }

  addSubject(): Observable<subject>{
    return this.SubjectService.addSubject(this.addSubjectName, this.addTeacherName);
  }

  

}
