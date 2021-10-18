import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 // HttpModule
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent  
  ],
  imports: [
    BrowserModule,
    // HttpModule
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
