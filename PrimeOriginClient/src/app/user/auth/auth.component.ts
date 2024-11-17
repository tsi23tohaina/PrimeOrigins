import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userService: UserService,
    private route: Router,
    private toastrService: ToastrService
  ){}
  data!: UserModel
  authGroup!: FormGroup;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;
  loading:Boolean = false;
  initAuthForm(){
    this.usernameCtrl = this.formBuilder.control("");
    this.usernameCtrl.addValidators([Validators.required]);
    this.passwordCtrl = this.formBuilder.control("");
    this.passwordCtrl.addValidators([Validators.required]);
    this.authGroup = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
    })
  }
  ngOnInit(): void {
    this.initAuthForm();
  }
  onSubmit() {
    this.loading = true;
    if (this.authGroup.valid) {
      this.userService.login(this.authGroup.value.username, this.authGroup.value.password)
        .subscribe(
          (result: any) => {
            this.loading = false;
            const token =  result["token"];
            sessionStorage.setItem("token", token);
            this.route.navigate(['fako/chat']);
            this.toastrService.success("connection sucess")
          },
          (error: any) => {
           console.log(error);
           this.loading = false;
           this.toastrService.error("try later")

          }
        );
    } else {
      console.log("Form is invalid");
    }
  }
}
