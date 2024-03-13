import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { Project } from 'src/app/store/models/project.model';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl: string = Constants.Url+'/project' // Assuming you have apiUrl defined in your environment

  constructor(private http: HttpClient) { }

  createProject(project: Project): Observable<Response<Project>> {
    return this.http.post<Response<Project>>(this.apiUrl, project);
  }

  updateProject(project: Project): Observable<Response<Project>> {
    return this.http.put<Response<Project>>(`${this.apiUrl}/${project.id}`, project);
  }

  deleteProject(id: number): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`${this.apiUrl}/${id}`);
  }
}
