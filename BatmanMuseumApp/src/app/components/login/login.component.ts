import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import {Title} from "@angular/platform-browser";
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit{
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit() {
    this.authService.isUser().subscribe(isUser => {
      if (isUser) {
        this.router.navigate(['/dashboard']);
      }
    });
  }
  

  ngOnDestroy() { }

  constructor(
    private router: Router,
    private toast: HotToastService, 
    private titleService:Title, 
    private authService: AuthService) {
    this.titleService.setTitle("The Batman Museum | Login");
  }

    onSubmit() {
    const email:any = this.loginForm.get('email')?.value
    const password: any = this.loginForm.get('password')?.value
    this.authService.login(email,password).then(cred => {
      this.router.navigateByUrl("/dashboard")
      this.toast.success("You have successfully logged in!")
    }).catch(error =>
      this.toast.error("Invalid email or password!"));
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
  
}
