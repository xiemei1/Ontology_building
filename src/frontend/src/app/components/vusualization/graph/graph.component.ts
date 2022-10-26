import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CONCEPTS } from '../../concept';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnInit {
    alldata = CONCEPTS
    names :any
  
 
 
  

  constructor() {
    
  }

  ngOnInit() {

    
    
  }
  

  
    
}
