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

  ngOnInit() {
    this.esVacio = true;
    this.buscasdorForm = this.formBuilder.group({
      'palabraClave': ['', Validators.required]
    });


    this.getPosts();
  }

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

  Borrar(): void{
    this.posts = [];
    for (let item of this.bckposts) {
      this.posts.push(item);
    }    
  }

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
