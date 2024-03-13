import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/store/models/user.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = Constants.Url + '/auth'; // Assuming you have apiUrl defined in your environment

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<Response<any>>(this.apiUrl + '/login', user);
  }

  register(user: User) {
    return this.http.post<Response<any>>(this.apiUrl + '/register', user);
  }
}
