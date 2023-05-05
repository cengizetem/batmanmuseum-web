import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user/user.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private router: Router,
    private toast: HotToastService, 
    private titleService:Title, 
    private authService: AuthService,
    private userService: UserService) {
    this.titleService.setTitle("The Batman Museum | Register");
  }

  ngOnInit() {
    this.authService.isUser().subscribe(isUser => {
      if (isUser) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit() {
    const email:any = this.registerForm.get('email')?.value
    const password: any = this.registerForm.get('password')?.value
    this.authService.register(email,password).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: email,
        fullname: "",
        address: "",
        phoneNumber: "",
        review: "",
        isAdmin: false
      }
      this.userService.createAnAccount(user).then(() => {
        this.router.navigateByUrl("/dashboard").then(() => {
          this.toast.success("You have successfully registered on the platform.")
        })
      }).catch(err => this.toast.error("Error occurred while uploading the data."))
    }).catch(err => this.toast.error("The account is already registered."))
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }
}
