import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
   url = 'http://127.0.0.1'

  
  constructor(private http: HttpClient) { }


  //login general
  login(data: any): Observable<any> {
    return this.http.post(this.url+"/login", data);
  }


}
