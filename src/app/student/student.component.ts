/**This line imports the Component decorator from the Angular core module. 
 * This decorator is used to define a component in Angular. */
import { Component } from '@angular/core';

/**This imports the SubjectService from the specified path. 
 * The SubjectService provides methods for fetching subjects. */
import { StudentService } from '../services/student.service';

/**This imports the subject class from the specified path. 
 * The subject model represents the structure of a subject. */
import { student } from '../model/student.model';

/**This imports the Observable and Subject classes from the RxJS library. 
 * These are used for handling asynchronous operations and creating observable streams of data. */
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  /**This declares a property named subject and initializes it as an empty array of subject objects. 
   * This property will be used to store the subjects fetched from the service. */
  students: Array<student> = [];
  searchInputValue: string = '';
  deleteInputValue: string = '';
  updateStudentID: string = '';
  updateProperty: string = '';
  updateValue: string = '';
  addStudentID: string = '';
  addFirstName: string = '';
  addLastName: string = '';

  /**This is the constructor of the SubjectComponent class. 
   * It takes an instance of SubjectService as a parameter (dependency injection) and initializes the component. */
  constructor( 
    

    /**In the constructor, it calls the getSubjects method to fetch subjects from the service. 
     * It subscribes to the observable returned by getSubjects and assigns the fetched data to the subject property when the data 
     * is received. */
    private StudentService: StudentService )
    {
      this.getStudents().subscribe((data) => {this.students = data})
    }

    search(): void {
      console.log('Search button clicked! Value:', this.searchInputValue);
      this.getSpecificStudent().subscribe(
        (result) => {
          this.students = [result]; // Update the subjects array with the new record
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
      this.deleteSpecificStudent().subscribe(
        (result) => {
          this.students = [result];
        },
        (error) => {
          console.error(error);
        }
      )
    }

    update(): void {
      console.log('Subject updated:', this.updateStudentID);
      console.log('Property updated:', this.updateProperty);
      console.log('New property value:', this.updateValue);
      this.updateSubjectProperty().subscribe(
        (result) => {
            this.students = [result];
        },
        (error) => {
            console.error(error);
            // Handle error
        }
    );
    }
    

    add(): void {
      console.log('Subject updated:', this.addStudentID);
      console.log('Property updated:', this.addFirstName);
      console.log('Property updated:', this.addLastName);
      this.addStudent().subscribe(
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
  getStudents(): Observable<any>{
    return this.StudentService.getStudents()
  }

  getSpecificStudent(): Observable<student>{
    return this.StudentService.getSpecificStudent(this.searchInputValue);
  }

  deleteSpecificStudent(): Observable<student>{
    return this.StudentService.deleteStudent(this.deleteInputValue);
  }

  updateSubjectProperty(): Observable<student>{
    return this.StudentService.updateProperty(this.updateStudentID, this.updateProperty, this.updateValue);
  }

  addStudent(): Observable<student>{
    return this.StudentService.addStudent(this.addStudentID, this.addFirstName, this.addLastName);
  }


}
