import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { UserModel } from '../../models/user.model';
import { ToastrService } from 'ngx-toastr';
import { AuthComponent } from '../auth/auth.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit{
 constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
 ){}

 newUser!: UserModel;
 RegistryGroup!: FormGroup;
 userNameCtrl!: FormControl;
 passwordCtrl!: FormControl;
 emailCtrl!:FormControl
 loading:Boolean = false;

 initRegistry(){

    this.userNameCtrl = this.formBuilder.control('');
    this.userNameCtrl.addValidators([Validators.required])

    this.emailCtrl = this.formBuilder.control('')
    this.emailCtrl.addValidators([Validators.required])



    this.passwordCtrl = this.formBuilder.control('');
    this.passwordCtrl.addValidators([Validators.required, Validators.minLength(8)]);

    this.RegistryGroup = this.formBuilder.group({
      username: this.userNameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl
    })
 }

 registry(){
  this.loading = true;
  if(this.RegistryGroup.valid){
    this.newUser = this.RegistryGroup.value;
    this.newUser.role = "CLIENT";
    this.userService.addUser(this.newUser).subscribe(
       (response: any)=>{  
         this.toastrService.success(`${response.username} you are saved with sucess`);
         this.loading = false;
          this.userService.login(this.newUser.username, this.newUser.password).subscribe(
            (result: any) => {
            this.toastrService.success("Login successful")
            this.loading = false;
            const token =  result["token"];
            sessionStorage.setItem("token", token);
            this.router.navigateByUrl('fako/chat')        
          },
          (error: any) => {
           this.toastrService.error("Try later","",{
            positionClass:"toast-top-left",
           });
           console.log(error);
           this.loading = false;

          }
          )
       },
       (error:any)=>{
          this.toastrService.error("registry failed");
          this.loading = false;
       }
    )
  }
 }
 ngOnInit(): void {
  this.initRegistry();
}
}