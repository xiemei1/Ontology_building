import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import *  as  dataJson from '..//..//person1.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  data: any = (dataJson as any).default;
  detail :any
  content:any
  fre:any

  constructor() { }

  ngOnInit(): void {
    this.get_details()
    
  }
  get_details(){
   this.detail  =  this.data.chilren
   console.log(this.detail)
   this.detail.forEach((element: { name: string; content: any; fre: any; }) => {
     if (element.name == 'Hillary'){
       this.content = element.content
       this.fre= this.content.length
     }
     
   });
  }
  
}

