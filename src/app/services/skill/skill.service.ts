import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from 'src/app/store/models/skill.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  baseUrl = Constants.Url+'/skill';

  constructor(
    private http: HttpClient,
  ){}

  createSkill(skill: Skill){
    return this.http.post<Response<Skill>>(this.baseUrl, skill);
  }

  updateSkill(skill: Skill){
    return this.http.put<Response<Skill>>(`${this.baseUrl}/${skill.id}`, skill);
  }

  deleteSkill(id: number){
    return this.http.delete<Response<any>>(`${this.baseUrl}/${id}`);
  }
}
