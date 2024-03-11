import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from 'src/app/store/models/contact.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = Constants.Url+'/contact';

  constructor(
    private http:HttpClient,
  ){}

  createContact(contact:Contact){
    console.log('contact',contact);
    
    return this.http.post<Response<Contact>>(this.baseUrl,contact);
  }

  updateContact(contact:Contact){
    return this.http.put<Response<Contact>>(this.baseUrl+'/'+contact.id,contact);
  }

  deleteContact(id:number){
    return this.http.delete<Response<any>>(this.baseUrl+'/'+id);
  }
}
