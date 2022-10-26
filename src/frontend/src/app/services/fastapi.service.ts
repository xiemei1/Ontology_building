import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, ObservedValuesFromArray, of } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { concept } from '../components/concept';



@Injectable({
  providedIn: 'root'
})
export class FastapiService {
  private _http: HttpClient;
  //private _baseUrl: string;

constructor(http: HttpClient) {
    this._http = http;
   // this._baseUrl = "http://127.0.0.1:8000"
  }

  //public text(text: text): Observable<any> {
   // return this._http.post<text>(this._baseUrl + '/get-text', text);
  //}
  get_clean():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/remove-stopwords')

  }

  get_text():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/get-text')
  }
  get_sentence():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/get-sentences')
  }
  get_nameentities():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/get-nameentities')
  }
  get_compounds():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/components')
  }
  get_pnp():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/noun_pre_noun')
  }
  get_verbs():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/verbs')
  }
  get_re1():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/subtree_matcher')
  }

  get_re2():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/chunk_matcher')
  
  }
  get_test():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/te/')
  }
  get_t():Observable<object>{
    return this._http.get('http://127.0.0.1:8000/llll')
  }

 

 
}



