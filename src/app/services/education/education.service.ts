import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Education } from 'src/app/store/models/education.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  baseUrl = Constants.Url + '/education';

  constructor(private http: HttpClient) { }

  addEducation(education: Education){
    return this.http.post<Response<Education>>(this.baseUrl, education);
  }

  updateEducation(education: Education){
    return this.http.put<Response<Education>>(this.baseUrl+'/'+education.id, education);
  }

  deleteEducation(id: number){
    return this.http.delete<Response<Education>>(this.baseUrl + '/' + id);
  }
}
