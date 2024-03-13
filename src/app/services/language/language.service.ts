import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { Language } from 'src/app/store/models/language.model';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl: string = Constants.Url + '/language'; // Assuming you have apiUrl defined in your environment

  constructor(private http: HttpClient) { }

  createLanguage(language: Language): Observable<Response<Language>> {
    return this.http.post<Response<Language>>(this.apiUrl, language);
  }

  updateLanguage(language: Language): Observable<Response<Language>> {
    return this.http.put<Response<Language>>(`${this.apiUrl}/${language.id}`, language);
  }

  deleteLanguage(id: number): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`${this.apiUrl}/${id}`);
  }
}
