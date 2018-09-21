import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from "../user.service";
import {Answers} from "../../shared/answers";
import {Router} from "@angular/router";
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required] ],
  });

  constructor(private fb: FormBuilder, private userService: UserService,  private route: Router) { }

  ngOnInit() {
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value).then((result: Answers) => {
      if (result.status) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('profile_id', result.profile_id);
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('user', JSON.stringify(result.user));
        this.route.navigate(['news']);
      } else {
        swal('Login incorrecto...', result.message , 'error');
      }
    });
  }

}
