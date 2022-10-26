import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FastapiService } from 'src/app/services/fastapi.service';


//export class Others{
  //constructor(
    //public version: string
  //){ }}

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
//定义变量
texts :any;
sentences : any;
verbs : any;
Nouns : any;
clean_text:any;

public version: any ;
  constructor(
    private _fastApiService: FastapiService,
    private httpclient: HttpClient,
  ) { 
    

     
  }

  ngOnInit(): void {
    this.getversion();
    this.get_sentence();
    this.get_text();
  }
 
  
 getversion(){
   this.httpclient.get<any>('http://127.0.0.1:8000/version').subscribe(
     response =>{
       console.log(response);
       this.version = response;
      }
   ) }

   get_text(){
    this.texts = this._fastApiService.get_text().subscribe(
      response=>{
        console.log('textget')
        this.texts = response;
      }
    )
    
  }
  get_sentence(){
    this.sentences = this._fastApiService.get_sentence().subscribe(
      response =>{
        console.log("sentenceget")
        this.sentences = response;
      }
    )

  }
  get_clean(){
    this.clean_text = this._fastApiService.get_clean().subscribe(
      response =>{
        console.log("remove stop words")
        this.clean_text = response;
      }
    )

  }
  

}

