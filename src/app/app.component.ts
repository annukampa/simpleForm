import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { MatHint } from '@angular/material/form-field';
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simpleForm';
  panelOpenState = false;
  imagesUploaded : any = [];
  //simpleForm = new FormGroup({
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('', [Validators.required]);
    desc = new FormControl('', [Validators.required,Validators.maxLength(256)]);
    email = new FormControl('', [Validators.required, Validators.email]);
  //});
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
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
  }
  sendMail() : void {
    //console.log('simpleForm ##@#@', this.simpleForm);
    console.log('in sendMail email is #@#@');
    
    let data = {
      service_id: 'service_l6nrh0n',
      template_id: 'template_pw57tkm',
      user_id: 'SEGttPFHQkkumnCZ2',
      template_params: {
        to_name: 'Annukampa',
        from_name: 'Simple Forms',
        emailAddress: 'annukampagvd@gmail.com',
        message: 'testing images #@3@3',
        img01: '<div><h1>Jimbo.</h1>\n<p>Thats what she said</p></div>'
      }
    };

    this.http.post('https://api.emailjs.com/api/v1.0/email/send', data, { responseType: 'text' })
      .subscribe((result) => {
        alert('Your message has been sent!');
      }, (error: HttpErrorResponse) => {
        alert('Oops... ' + error.message);
      }
    );
  }
}
