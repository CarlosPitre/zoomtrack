import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {Answers} from "../shared/answers";
import {User} from "./user";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];
  pages: [{
    page: number,
    init: number,
  }];
  init: number;
  userForms = this.fb.group({
    filter: [''],
    final: ['10'],
    id: [''],
    name: ['', [Validators.minLength(4), Validators.required]],
    username: ['', [Validators.minLength(4), Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(4), Validators.required]],
  });
  user: User;
  submitted = false;
  createUser: boolean;

  constructor(private userService: UserService, private fb: FormBuilder, private modalService: NgbModal) {
    this.init = 0;
    this.getUser(this.init, this.userForms.value.final);
  }

  ngOnInit() {
  }

  pagination (init) {
    this.init = init;
    this.getUser(this.init, this.userForms.value.final);
  }

  get f() {
    return this.userForms.controls;
  }

  // evento utilizado en el onchange del select de items
  changeItem () {
    this.getUser(this.init, this.userForms.value.final);
  }

  // open modal para editar user
  editUser(user: User, content, createUser) {
    this.createUser = createUser;
    this.userForms.controls['id'].setValue(user.id);
    this.userForms.controls['name'].setValue(user.name);
    this.userForms.controls['username'].setValue(user.username);
    this.userForms.controls['email'].setValue(user.email);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // open modal para crear user
  newUser(content, createUser) {
    this.createUser = createUser;
    this.userForms.controls['id'].setValue('');
    this.userForms.controls['name'].setValue('');
    this.userForms.controls['username'].setValue('');
    this.userForms.controls['email'].setValue('');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // listado de usuarios
  getUser (init, final) {
    this.userService.getUsers(init, final).then((result: Answers) => {
      if (result.status) {
        this.users = result.users;
        this.pages = result.pages;
      } else {
        console.warn(result.message);
      }
    });
  }

  // editar usuario
  update() {
    this.submitted = true;
    console.log(this.userForms);
    if (this.userForms.invalid) {
      return;
    }
    this.userService.updateUsers(this.userForms.value).then((result: Answers) => {
      if (result.status) {
        this.getUser(this.init, this.userForms.value.final);
        swal('Registro exitoso...', result.message, 'success');
        this.modalService.dismissAll();
      } else {
        swal('Tenemos problemas...', result.message, 'error');
      }
    });
  }

  // eliminar usuario
  delete(id) {
    swal({
      title: 'Estás seguro?',
      text: '¡No podrás revertir esto!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminalo!',
      cancelButtonText: 'No, cancelar'
    }).then((response) => {
      if (response.value) {
        this.userService.deleteUsers(id).then((result: Answers) => {
          if (result.status) {
            this.getUser(this.init, this.userForms.value.final);
            swal('Registro exitoso...', result.message, 'success');
          } else {
            swal('Tenemos problemas...', result.message, 'error');
          }
        });
      }
    });
  }

  // cambiar el estado del usuario
  changeState(user) {
    let mensaje = '';
    console.log(user.state);
    if (user.state == 1) {
      mensaje = 'Si deshabilitas al usuario no podrá realizar ninguna acción dentro del sistema';
    } else {
      mensaje = 'Al habilitar el usuario podrá realizar acciones en el sistema';
    }
    swal({
      title: 'Estás seguro?',
      text: mensaje,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Hazlo!',
      cancelButtonText: 'No, cancelar'
    }).then((response) => {
      if (response.value) {
        if (user.state == 1) {
          user.state = false;
        } else {
          user.state = true;
        }
        this.userService.changeState(user).then((result: Answers) => {
          if (result.status) {
            this.getUser(this.init, this.userForms.value.final);
            swal('Registro exitoso...', result.message, 'success');
          } else {
            swal('Tenemos problemas...', result.message, 'error');
          }
        });
      }
    });
  }

  // registrar un nuevo usuario
  create() {
    this.submitted = true;
    console.log(this.userForms);
    if (this.userForms.invalid) {
      return;
    }
    this.userService.register(this.userForms.value).then((result: Answers) => {
      if (result.status) {
        this.getUser(this.init, this.userForms.value.final);
        swal('Registro exitoso...', result.message, 'success');
        this.modalService.dismissAll();
      } else {
        swal('Tenemos problemas...', result.message, 'error');
      }
    });
  }

}
