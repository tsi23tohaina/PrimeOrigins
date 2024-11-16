import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private formBuilder: FormBuilder,
  ){}
 
  authGroup!: FormGroup;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;
  loading:Boolean = false;
  initAuthForm(){
    this.usernameCtrl = this.formBuilder.control("");
    this.usernameCtrl.addValidators([Validators.required]);
    this.passwordCtrl = this.formBuilder.control("");
    this.passwordCtrl.addValidators([Validators.required, Validators.minLength(8)]);
    this.authGroup = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
    })
  }
  ngOnInit(): void {
    this.initAuthForm();
  }
  onSubmit(){
    console.log(this.authGroup.value);
  }
}
