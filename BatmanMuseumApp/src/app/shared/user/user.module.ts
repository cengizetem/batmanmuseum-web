export class User { 
  id: string;
  email: string;
  fullname: string; 
  address: string;
  phoneNumber: string;
  review: string;
  isAdmin: boolean;
  
  constructor(User: User) {
    this.id = User.id;
    this.email = User.email;
    this.fullname = User.fullname
    this.address = User.address
    this.phoneNumber = User.phoneNumber
    this.review = User.review
    this.isAdmin = User.isAdmin
  }
}
