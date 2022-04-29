import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class AuthService {

  constructor() {}

  logout() {
    if (this.isAuthenticated()) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
    }
  }

  isAuthenticated() {
    return sessionStorage.getItem("token") !== null;
  }

}
