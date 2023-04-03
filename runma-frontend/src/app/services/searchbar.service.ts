import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


//add in root 
@Injectable({
  providedIn: 'root'
})

export class SearchbarService {
 // http://localhost:8080/event/searchEvent/null/null/10-50
  apiUrl= 'http://localhost:8080/event/searchEvent/'
  constructor( private http: HttpClient ) { }
 
    // check 1
    


getAllEvent ( searchbarresult :SearchbarResult): Observable< SearchbarResult[]>{
  console.log("finish", searchbarresult)
  console.log(searchbarresult.name)
  
  return this.http.post<SearchbarResult[]>(this.apiUrl+`${searchbarresult.name}`, searchbarresult)
  }




     // check 2

}


export interface SearchbarResult{
  name:string;
  province:string;
  distance:string;
}