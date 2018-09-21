import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../user.service";
import {Answers} from "../../shared/answers";
import swal from 'sweetalert2';

import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;
  registerForm = this.fb.group({
    name: ['', [Validators.minLength(4), Validators.required]],
    username: ['', [Validators.minLength(4), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required] ],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) { }

  get f() { return this.registerForm.controls; }

  ngOnInit() {
  }

  register() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.userService.register(this.registerForm.value).then((result: Answers) => {
      if (result.status) {
        swal('Registro exitoso...', result.message , 'success');
        this.registerForm.value.password = null;
        localStorage.setItem('token', result.token);
        localStorage.setItem('profile_id', result.profile_id);
        localStorage.setItem('id', result.id.toString());
        localStorage.setItem('user', JSON.stringify(this.registerForm.value));
        this.route.navigate(['news']);
      } else {
        swal('Registro exitoso...', result.message , 'error');
      }
    });

  }

}
