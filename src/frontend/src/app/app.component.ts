import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { statistics } from './components/data';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myproject';
  version = '0.0.1'
  

  isCollapsed = false;
  data: Observable<statistics>;

  constructor(private http: HttpClient) {
   this.data = this.http.get<statistics>('./assets/catogories.json');
 }
  }
  






