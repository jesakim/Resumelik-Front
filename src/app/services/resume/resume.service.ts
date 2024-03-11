import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FullResume } from 'src/app/store/models/full-resume.model';
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
    return this.http.get<Response<FullResume>>(this.baseUrl+'/'+name);
  }

  updateResume(resume:Resume){
    console.log(resume);
    
    return this.http.put<Response<Resume>>(this.baseUrl+'/'+resume.id,resume);
  }

  deleteResume(id:number){
    return this.http.delete<Response<any>>(this.baseUrl+'/'+id);
  }

}
