import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/app/utils/constants';
import { Certificate } from 'src/app/store/models/certificate.model';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl: string = Constants.Url + '/certificate'; // Assuming you have apiUrl defined in your environment

  constructor(private http: HttpClient) { }

  createCertificate(certificate: Certificate): Observable<Response<Certificate>> {
    return this.http.post<Response<Certificate>>(this.apiUrl, certificate);
  }

  updateCertificate(certificate: Certificate): Observable<Response<Certificate>> {
    return this.http.put<Response<Certificate>>(`${this.apiUrl}/${certificate.id}`, certificate);
  }

  deleteCertificate(id: number): Observable<Response<any>> {
    return this.http.delete<Response<any>>(`${this.apiUrl}/${id}`);
  }
}
