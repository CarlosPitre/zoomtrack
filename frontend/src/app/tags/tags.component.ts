import { Component, OnInit } from '@angular/core';
import {Tag} from "./tag";
import {FormBuilder, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TagService} from "./tag.service";
import {Answers} from "../shared/answers";
import swal from 'sweetalert2';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[];
  pages: [{
    page: number,
    init: number,
  }];
  init: number;
  tagForms = this.fb.group({
    filter: [''],
    final: ['10'],
    id: [''],
    name: ['', [Validators.minLength(4), Validators.required]],
  });
  tag: Tag;
  submitted = false;
  createTag: boolean;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private tagService: TagService) {
    this.init = 0;
    this.getTags(this.init, this.tagForms.value.final);
  }

  ngOnInit() {
  }

  pagination (init) {
    this.init = init;
    this.getTags(this.init, this.tagForms.value.final);
  }

  get f() {
    return this.tagForms.controls;
  }

  // evento utilizado en el onchange del select de items
  changeItem () {
    this.getTags(this.init, this.tagForms.value.final);
  }

  // listado de usuarios
  getTags (init, final) {
    this.tagService.getTags(init, final).then((result: Answers) => {
      if (result.status) {
        this.tags = result.tags;
        this.pages = result.pages;
      } else {
        console.warn(result.message);
      }
    });
  }

  // open modal para editar tag
  editTag(tag: Tag, content, createTag) {
    this.createTag = createTag;
    this.submitted = false;
    this.tagForms.controls['id'].setValue(tag.id);
    this.tagForms.controls['name'].setValue(tag.name);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // open modal para crear tag
  newUser(content, createTag) {
    this.createTag = createTag;
    this.submitted = false;
    this.tagForms.controls['id'].setValue('');
    this.tagForms.controls['name'].setValue('');
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

  // editar usuario
  update() {
    this.submitted = true;
    if (this.tagForms.invalid) {
      return;
    }
    this.tagService.updateTags(this.tagForms.value).then((result: Answers) => {
      if (result.status) {
        this.getTags(this.init, this.tagForms.value.final);
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
        this.tagService.deleteTags(id).then((result: Answers) => {
          if (result.status) {
            this.getTags(this.init, this.tagForms.value.final);
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
    if (this.tagForms.invalid) {
      return;
    }
    this.tagService.register(this.tagForms.value).then((result: Answers) => {
      if (result.status) {
        this.getTags(this.init, this.tagForms.value.final);
        swal('Registro exitoso...', result.message, 'success');
        this.modalService.dismissAll();
      } else {
        swal('Tenemos problemas...', result.message, 'error');
      }
    });
  }

}
