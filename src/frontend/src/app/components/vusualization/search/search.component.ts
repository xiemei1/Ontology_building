import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { CONCEPTS } from '../../concept';
import { concept } from '../../concept';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
 
})
export class SearchComponent implements OnInit {
  examples = [
    {
        title: 'Person',
        route: '/line-chart'
    },
    {
        title: 'Org',
        route: '/multi-series'
    },
    {
        title: 'GPE',
        route: '/bar-chart'
    },
    {
        title: 'LOC',
        route: '/stacked-bar-chart'
    },
    {
        title: 'FAC',
        route: '/brush-zoom'
    },
    {
        title: "NORP",
        route: '/pie-chart'
    },
  
];

query :any
 

  constructor(private searchService:SearchService) { }
  

  ngOnInit(): void {
    
     
    //  this.alldata.forEach(element => {
    //    if (element.name == this.query){
    //      this.content = element.content
    //      this.fre= this.content.length
    //    }
      
    //  });
     //console.log(this.content)
  }
  log(): void {
    console.log('click dropdown button');
  }
  

}
