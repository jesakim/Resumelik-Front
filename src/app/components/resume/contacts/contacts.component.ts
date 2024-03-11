import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { addContact, deleteContact, updateContact } from 'src/app/store/actions/contact.actions';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Contact } from 'src/app/store/models/contact.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {

  contacts :Contact[] = [];
  contactForm! : FormGroup;
  resumeId! : number;


  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
  ){}

  ngOnInit(){
    this.store.dispatch(switchActiveTab( 'Contacts' ));
    this.store.pipe(select(selectResume)).subscribe(resume => {
      this.contacts = resume.contacts;
      this.resumeId = resume.id;
    
      this.contactForm = this.formBuilder.group({
        id: [''],
        type: ['OTHER',Validators.required],
        text: ['',Validators.required],
        link: ['',Validators.required],
        resumeId: [this.resumeId,Validators.required],
        });
    });
  }

  submitContact(){
    if(this.contactForm.valid){
      if(this.contactForm.value.id === ''){
      const contact = this.contactForm.value as Contact;
      console.log('contact',contact);
      this.store.dispatch(addContact({contact}));
      }else{
        this.store.dispatch(updateContact({contact: this.contactForm.value}));
      }
    }else{
      this.contactForm.markAllAsTouched();
    }
  }

  editContact(contact: Contact){
    this.contactForm.setValue(contact);
  }

  contactFormReset(){
    this.contactForm = this.formBuilder.group({
      id: [''],
      type: ['OTHER',Validators.required],
      text: ['',Validators.required],
      link: ['',Validators.required],
      resumeId: [this.resumeId,Validators.required],
      });
  }

  deleteContact(id :number){
    this.store.dispatch(deleteContact({id}));
  }
}
