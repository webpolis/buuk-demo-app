import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${environment.api}/tests`).subscribe(
      (response: any) => {
        return response;
      },
      (error: any) => {

      }
    );;
  }
}
