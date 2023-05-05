import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { User } from '../shared/user/user.module';
import { where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  //create
  createAnAccount(user: User) {
    return this.afs.collection<User>("Users").doc(user.id).set(user);
  }

  //update
  updateAccount(user: User) {
    return this.afs.collection<User>("Users").doc(user.id).update(user);
  }

  //read
  async getUserById(userid: string): Promise<User> {
    const snapshot = await this.afs.collection<User>("Users").doc(userid).ref.get();
    const data = snapshot.data();
    if (!data) {
      throw new Error(`User with id ${userid} not found`);
    }
    const user: User = {
      id: data.id,
      email: data.email,
      fullname: data.fullname,
      address: data.address,
      phoneNumber: data.phoneNumber,
      review: data.review,
      isAdmin: data?.isAdmin
    };
    return user;
  }

   getAllUser(limit: number): Observable<DocumentChangeAction<unknown>[]> {
    return this.afs.collection('Users', ref => ref.limit(limit)).snapshotChanges();
  }

  //delete
  deleteAccount(userid: string) {
    return this.afs.collection<User>("Users").doc(userid).delete();
  }
  
}
