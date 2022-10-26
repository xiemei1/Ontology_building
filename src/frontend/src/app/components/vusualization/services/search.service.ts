import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { concept, CONCEPTS } from '../../concept';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private conceptsUrl = 'api/concepts'

  constructor(private http: HttpClient) { 
    
  }
}

