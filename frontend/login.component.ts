import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ConnectionService } from 'src/app/services/connection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private dataService: ConnectionService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  //***** DECLARATIONS *****//

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passFormControl = new FormControl('', [Validators.required]);
  hide = true;

  //**********//

  login() {
    
        // debe tener validacion de campos email y password

      let user = { email: "", password: "" }
      this.dataService.login(user).subscribe(data => {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("email", data.email);
          this.router.navigate(['/admin/ventas']);
      }, error => {
          console.log(error);
      })

  }



}
