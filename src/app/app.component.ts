import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fix the property name to styleUrls
})
export class AppComponent {

  // Adding a router in the constructor
  constructor(private router: Router){ }

  

  title = 'Education App';

  navigateToSubject() {
    this.router.navigate(['/subject']);
  }
  
}