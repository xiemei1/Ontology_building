import { Component, OnInit } from '@angular/core';
import { FastapiService } from 'src/app/services/fastapi.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-senmantic',
  templateUrl: './senmantic.component.html',
  styleUrls: ['./senmantic.component.css']
})
export class SenmanticComponent implements OnInit {
components:any
verbs :any
  constructor(
    private _fastApiService: FastapiService,
    private httpclient: HttpClient,) { }

  ngOnInit(): void {
    
  }
  

  get_verbs(){
    this.verbs = this._fastApiService.get_verbs().subscribe(
      response =>{
        console.log('verb')
        this.verbs = response
      }
    )

  }
}
