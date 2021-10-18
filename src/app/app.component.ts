import { Component, OnInit } from '@angular/core';
import { FetchdataService } from './fetchdata.service';
import { environment } from '../environments/environment';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FetchdataService]
})
export class AppComponent implements OnInit {
  esVacio: boolean;
  buscasdorForm: FormGroup;
  public vector = [];
  public posts = [];
  public bckposts = [];
  public url = environment.apiUrl;

  constructor(private srv: FetchdataService, private formBuilder: FormBuilder) { }

  /*
  * Metodo de inicio
  */
  ngOnInit() {
    this.esVacio = true;
    this.buscasdorForm = this.formBuilder.group({
      'palabraClave': ['', Validators.required]
    });


    this.getPosts();
  }

  /*
  * Metodo para consultar todos los posts existentes en el sistema
  */
  getPosts(): void {
    this.srv.getData(this.url)
      .subscribe(data => {
        this.vector.push(data);
        for (let array of this.vector) {
          for (let item of array) {
            this.posts.push(item);
            this.bckposts.push(item);
          }
        }
      },
        error => console.log(error)
      )
  }

  /*
  * Metodo para borrar el filtro realizado
  */
  Borrar(): void {
    this.posts = [];
    for (let item of this.bckposts) {
      this.posts.push(item);
    }

    this.buscasdorForm.controls.palabraClave.setValue('');
  }

  /*
  * Metodo para consultar los posts pasando la palabra clave como parametro
  */
  Consultar(): void {
    debugger;
    let palabra = this.buscasdorForm.controls.palabraClave.value;
    if (palabra == '') {
      this.esVacio = false;
      return;
    }
    this.posts = [];
    for (let item of this.bckposts) {
      if (item.id.toString().indexOf(palabra) >= 0 || item.userId.toString().indexOf(palabra) >= 0 || item.title.indexOf(palabra) >= 0 || item.body.indexOf(palabra) >= 0)
        this.posts.push(item);
    }
  }
}
