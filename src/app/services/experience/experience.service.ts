import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from 'src/app/store/models/experience.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  baseUrl = Constants.Url+'/experience';

  constructor(
    private http:HttpClient,
  ){}

  createExperience(experience:Experience){
    return this.http.post<Response<Experience>>(this.baseUrl,experience);
  }

  updateExperience(experience:Experience){
    return this.http.put<Response<Experience>>(this.baseUrl+'/'+experience.id,experience);
  }

  deleteExperience(id:number){
    return this.http.delete<Response<any>>(this.baseUrl+'/'+id);
  }
}
