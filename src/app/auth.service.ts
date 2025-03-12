import { Injectable } from '@angular/core';
import { Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  userData: any = new BehaviorSubject(null);

  constructor(private auth: Auth, private _router: Router) { 
    if(localStorage.getItem('userToken') != null){
      this.saveData()
    }
  }

  saveData() {
    this.userData.next(localStorage.getItem('userToken'));
    console.log(this.userData.value);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.userData.next(localStorage.removeItem('userToken'));
    this.userData.next(null);
    this._router.navigate(['login'])
  }
}
