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
  Borrar(): void{
    this.posts = [];
    for (let item of this.bckposts) {
      this.posts.push(item);
    }    
  }

  /*
  * Metodo para consultar los posts pasando la palabra clave como parametro
  */
  Consultar(): void {
    let palabra = this.buscasdorForm.controls.palabraClave.value;
    if (palabra == '') {
      this.esVacio = false;
      return;
    }
    this.posts = [];
    for (let item of this.bckposts) {
      if (item.id == palabra)
        this.posts.push(item);

      if (item.userId == palabra)
        this.posts.push(item);

      if (item.title == palabra)
        this.posts.push(item);

      if (item.body == palabra)
        this.posts.push(item);
    }
  }
}
