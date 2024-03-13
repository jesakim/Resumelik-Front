import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { switchActiveTab } from 'src/app/store/actions/resume.actions';
import { Certificate } from 'src/app/store/models/certificate.model';
import { selectResume } from 'src/app/store/selectors/resume.selectors';
import { AppState } from 'src/app/store/states/app.state';
import * as CertificateActions from 'src/app/store/actions/certificate.actions';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.css']
})
export class CertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  certificateForm!: FormGroup;
  resumeId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(switchActiveTab('Certificates'));
    this.store.pipe(select(selectResume)).subscribe((resume) => {
      this.resumeId = resume.id;
      this.certificates = resume.certificates;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.certificateForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      date: ['', Validators.required],
      issuer: ['', Validators.required],
      resumeId: [this.resumeId, Validators.required]
    });
  }

  submitCertificate(): void {
    if (this.certificateForm.valid) {
      const certificate: Certificate = this.certificateForm.value;
      if (!certificate.id) {
        this.store.dispatch(CertificateActions.addCertificate({ certificate }));
      } else {
        this.store.dispatch(CertificateActions.updateCertificate({ certificate }));
      }
    } else {
      this.certificateForm.markAllAsTouched();
    }
  }

  certificateFormReset(): void {
    this.initializeForm();
  }

  deleteCertificate(id: number): void {
    this.store.dispatch(CertificateActions.deleteCertificate({ id }));
  }

  editCertificate(certificate: Certificate): void {
    this.certificateForm.patchValue({
      id: certificate.id,
      name: certificate.name,
      date: certificate.date ? formatDate(certificate.date, 'yyyy-MM-dd', 'en-US') : null,
      issuer: certificate.issuer,
      resumeId: this.resumeId
    });
  }
}
