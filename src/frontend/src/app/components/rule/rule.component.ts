import { Component, OnInit } from '@angular/core';
import { FastapiService } from 'src/app/services/fastapi.service';
@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {
  verbs:any
  components:any

  constructor(
    private _fastApiService:FastapiService
  ) { }

  ngOnInit(): void {
    
  }
  

  get_compounds(){
    this.components = this._fastApiService.get_compounds()

  }


}
