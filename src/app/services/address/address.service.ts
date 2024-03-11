import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from 'src/app/store/models/address.model';
import { Constants } from 'src/app/utils/constants';
import { Response } from 'src/app/utils/response';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl = Constants.Url+'/address';

  constructor(
    private http:HttpClient,
  ){}

  createAddress(address: Address){
    return this.http.post<Response<Address>>(this.baseUrl,address);
  }

  updateAddress(address: Address){
    return this.http.put<Response<Address>>(this.baseUrl+'/'+address.id,address);
  }

  deleteAddress(id: number){
    return this.http.delete<Response<any>>(this.baseUrl+'/'+id);
  }
}
