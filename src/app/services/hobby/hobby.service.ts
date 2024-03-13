import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { Hobby } from 'src/app/store/models/hobby.model';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {
  private apiUrl: string = Constants.Url + '/hobby'; // Assuming you have apiUrl defined in your environment

  constructor(private http: HttpClient) { }

  createHobby(hobby: Hobby): Observable<Response<Hobby>> {
    return this.http.post<Response<Hobby>>(this.apiUrl, hobby);
  }

  updateHobby(hobby: Hobby): Observable<Response<Hobby>> {
    return this.http.put<Response<Hobby>>(`${this.apiUrl}/${hobby.id}`, hobby);
  }

  deleteHobby(id: number): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`${this.apiUrl}/${id}`);
  }
}
