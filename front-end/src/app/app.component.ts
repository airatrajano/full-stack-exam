import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppService, IProductDetail } from './app.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [NgModule, RouterOutlet, HttpClientModule, NgFor],
  // providers: [AppService, HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'full-stack-exam';
  products: IProductDetail[] = [];
  constructor(private appService: AppService){}

  ngOnInit(){};

  getProductById(id:number){

  }

  async getAllProducts(){
    console.log('getAll')
    await this.appService.getAllProducts().subscribe((res)=>{
      this.products = res;
      console.log(res);
    });
  }
}
