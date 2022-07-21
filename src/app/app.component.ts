import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { MatHint } from '@angular/material/form-field';
import {DomSanitizer} from "@angular/platform-browser";
import {MatDialog} from '@angular/material/dialog';
import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simpleForm';
  panelOpenState = false;
  imagesUploaded : any = [];
  imagesName: any = [];
  dataCreated: any = {};
  isSending: boolean = false;
  //simpleForm = new FormGroup({
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    desc = new FormControl('', [Validators.required,Validators.maxLength(256)]);
    email = new FormControl('', [Validators.required, Validators.email]);
  //});
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public dialog: MatDialog) {}
  getNameErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' : '';
  }
  getLNameErrorMessage() {
    return this.lastName.hasError('required') ? 'You must enter a value' : '';
  }
  getDescErrorMessage() {
    return this.desc.hasError('required') ? 'You must add some description' : '';
  }
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  addImage() {
    $('#imgUploader')[0].click();
  }

  uploadFile(event: any) {
    console.log('files here are #@#@#', event.target.files);
    let files = event.target.files;
    let fileAdded = this.imagesUploaded.length === 0 && files.length === 1 ? files[0] : files[files.length - 1];
    let obj = {
      'fileName':  fileAdded['name'],
      'url': this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(fileAdded))
    }
    //@ts-ignore
    this.imagesUploaded.push(obj);
    this.imagesName.push(fileAdded['name']);
    console.log('files arr is@#', this.imagesUploaded);
  }
  resetDesc() {
    console.log('desc in reset', this.desc);
    this.desc.reset();
  }
  deleteImage(item: any, index:any) {
    console.log('item in del is @##', item);
    console.log('index in here @#', index);
    this.imagesUploaded.splice(index,1);
    console.log('after del #@32', this.imagesUploaded);
  }
  saveData() {
    console.log('in save data #@3@#@');
    this.dataCreated = {
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'description': this.desc.value,
      'email': this.email.value,
      'imagesAttached': this.imagesUploaded
    };
    console.log('data created is #@#@#@#@#', this.dataCreated);
  }
  sendMail() : void {
    this.isSending = true;
    //console.log('simpleForm ##@#@', this.simpleForm);
    console.log('in sendMail email is #@#@');
    
    this.dataCreated = {
      'firstName': this.firstName.value,
      'lastName': this.lastName.value,
      'description': this.desc.value,
      'email': this.email.value,
      'imagesAttached': this.imagesUploaded
    };
    let data = {
      service_id: 'service_l6nrh0n',
      template_id: 'template_pw57tkm',
      user_id: 'SEGttPFHQkkumnCZ2',
      template_params: {
        to_name: 'Annukampa',
        from_name: 'Simple Forms',
        emailAddress: 'annukampagvd@gmail.com',
        name: this.firstName.value + ' ' + this.lastName.value,
        desc: this.desc.value,
        imagesAdded: this.imagesName.toString(),
        header: '<div style="padding: 20px;background-color: #673ab7;color: white;"><h2>Simple Form Data</h2><p>Please find the details you submitted.</p><small>*All the data is as per your submission.</small></div>'
      }
    };

    this.http.post('https://api.emailjs.com/api/v1.0/email/send', data, { responseType: 'text' })
      .subscribe((result) => {
        setTimeout(function() {
      },100);
        this.isSending = false;
        this.dialog.open(SuccessDialogComponent);
      }, (error: HttpErrorResponse) => {
        alert('Oops... ' + error.message);
      }
    );
  }
}
