import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user/user.module';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit{

  profileForm!: FormGroup
  user: User = {} as User

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private auth: AuthService,
    private toast: HotToastService,
    private router: Router) {}

  async ngOnInit() {
    this.user = await this.userService.getUserById(await this.auth.getUid());
    this.profileForm = this.fb.group({
      fullname: [this.user.fullname, Validators.required],
      address: [this.user.address, Validators.required],
      phoneNumber: [this.user.phoneNumber, Validators.required],
      review: [this.user.review]
    });
  }
  
  get fullname() {
    return this.profileForm.get('fullname')
  }
  
  get address() {
    return this.profileForm.get('address')
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber')
  }

  get review() {
    return this.profileForm.get('review')
  }
  
  

  onSubmit() {
    const fullname = this.profileForm.get('fullname')?.value
    const address = this.profileForm.get('address')?.value
    const phoneNumber = this.profileForm.get('phoneNumber')?.value
    const review = this.profileForm.get('review')?.value

    const user: User = {
      id: this.user.id,
      email: this.user.email,
      fullname: fullname,
      address: address,
      phoneNumber: phoneNumber,
      review: review,
      isAdmin: this.user.isAdmin
    }

    this.userService.updateAccount(user).then(() =>{
      this.toast.success("You have successfully modified your profile.")
    }).catch(err=> this.toast.error("Error occurred while uploading the data."))
  }
  onLogout() {
    this.auth.logout();
    this.router.navigateByUrl('/')
  }

  onDelete() {
    this.userService.deleteAccount(this.user.id).then(() => {
    this.auth.deleteAuth(this.user.id).then(() => {
      this.toast.success("You have successfully deleted your account.")
    })
    })
    this.router.navigateByUrl('/')
  }
}
