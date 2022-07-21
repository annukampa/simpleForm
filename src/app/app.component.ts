import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';
import { MatHint } from '@angular/material/form-field';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simpleForm';
  panelOpenState = false;
  //simpleForm = new FormGroup({
    firstName = new FormControl('', [Validators.required]);
    lastName = new FormControl('');
    desc = new FormControl('', [Validators.maxLength(256)]);
    email = new FormControl('', [Validators.required, Validators.email]);
  //});
  constructor(private http: HttpClient) {}
  getNameErrorMessage() {
    return this.firstName.hasError('required') ? 'You must enter a value' : '';
  }
  //getDescErrorMessage() {
  //  return this.desc.value.length > 256
  //}
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  addImage() {
    $('#imgUploader')[0].click();
  }

  uploadFile(files: any) {
    console.log('files here are #@#@#', files);
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
