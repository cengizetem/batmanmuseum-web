import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HotToastService } from '@ngneat/hot-toast';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth, private toast: HotToastService) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email,password)
  }

  isUser() {
    return this.auth.authState.pipe(
      map(user => {
        if (user) {
          return true; 
        } else {
          return false; 
        }
      })
    );
  }
  
  logout() {
    return this.auth.signOut().then(() => {
      this.toast.success("You have successfully logged out.")
    })
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email,password);
  }

  async getUid(): Promise<string> {
    const user = await this.auth.currentUser;
    if (user) {
      return user.uid;
    } else {
      throw new Error('User not found.');
    }
  }

  async deleteAuth(uid: string): Promise<void> {
    try {
      const user = await this.auth.currentUser;
      if (user && user.uid === uid) {
        await user.delete();
      }
    } catch (error) {
      console.log('Error deleting user', error);
      throw error;
    }
  }
}
