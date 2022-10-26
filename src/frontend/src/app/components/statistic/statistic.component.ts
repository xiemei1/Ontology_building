import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FastapiService } from 'src/app/services/fastapi.service';
import { ConnectableObservable } from 'rxjs';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  name_entities:any
  test:any
  t: any

  constructor(
    private _fastApiService: FastapiService,
    private httpclient: HttpClient,) { }

  ngOnInit(): void {

   
  }


get_nameentities(){
  this.name_entities= this._fastApiService.get_nameentities().subscribe(
    response =>{
      console.log('nameentities')
      this.name_entities = response
    }
  )

}
get_test(){
  this.test = this._fastApiService.get_test()
}

get_t(){
  this.t = this._fastApiService.get_t().subscribe(
    response =>{
      console.log('get it')
      this.t = response;
    }
  )
}
}
