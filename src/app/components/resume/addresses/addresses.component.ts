import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as AddressActions from 'src/app/store/actions/address.actions';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Address } from 'src/app/store/models/address.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent {

  addresses :Address[] = [];
  addressForm! : FormGroup;
  resumeId! : number;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ){}

  ngOnInit(){
    this.store.dispatch(switchActiveTab( 'Addresses' ));
    this.store.pipe(select(selectResume)).subscribe(resume => {

      this.addresses = resume.addresses;
      this.resumeId = resume.id;
      this.addressForm = this.formBuilder.group({
        id: [''],
        street: [''],
        additionalStreet: [''],
        city: [''],
        country: ['',Validators.required],
        resumeId: [this.resumeId,Validators.required],
        });
    });
  }

  submitAdress(){
    if(this.addressForm.valid){
      if(this.addressForm.value.id === ''){
      const address = this.addressForm.value as Address;
      this.store.dispatch(AddressActions.addAddress({address}));
      }else{
        const address = this.addressForm.value as Address;
        this.store.dispatch(AddressActions.updateAddress({address}));
      }
    }else{
      this.addressForm.markAllAsTouched();
    }
  }

  addressFormReset(){
    this.addressForm = this.formBuilder.group({
      id: [''],
      street: [''],
      additionalStreet: [''],
      city: [''],
      country: ['',Validators.required],
      resumeId: [this.resumeId,Validators.required],
      });
    }

  deleteAddress(id: number){
    this.store.dispatch(AddressActions.deleteAddress({id}));
  }

  editAddress(address: Address){
    this.addressForm.patchValue(address);
  }

}
