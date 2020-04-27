import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  noAuthHeader = {headers: new HttpHeaders({NoAuth: 'True'})};
AuthHeader = {headers: new HttpHeaders().set('Authorization',
`Bearer ${localStorage.getItem('token')}`)};


  constructor(private http: HttpClient) { }

  submitPagent(form){
    return this.http.post(environment.apiBaseUrl + '/submit-pagent', form);
  }

  getAllpagent(){
    return this.http.get(environment.apiBaseUrl +'/get-all-pagent');
  }
}
