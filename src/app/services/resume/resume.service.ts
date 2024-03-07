import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resume } from 'src/app/store/models/resume.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  baseUrl = Constants.Url+'/resume';

  constructor(
    private http:HttpClient,
  ){}

  getResumes(){
    return this.http.get<Response<Resume[]>>(this.baseUrl);
  }

  addResume(resume:Resume){
    return this.http.post<Response<Resume>>(this.baseUrl,resume);
  }

  getResumeByName(name:string){
    return this.http.get<Response<Resume>>(this.baseUrl+'/'+name);
  }

}
