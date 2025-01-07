import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private baseUrl = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<IProductDetail[]>{
    return this.http.get<IProductDetail[]>(this.baseUrl+'products');
  }

  getProductDetail(id: number): Observable<IProductDetail>{
    return this.http.get<IProductDetail>(this.baseUrl+`product/${id}`)
  }

  getProductType(): Observable<any>{
    return this.http.get(this.baseUrl+'product-types')
  }

  addProduct(product: IProductDetail){
    return this.http.post(this.baseUrl+'product', product)
  }

  deleteProduct(id: number){
    return this.http.delete(this.baseUrl+`product/${id}`)
  }

}

export interface IProductDetail {
  type: string,
  name: string,
  id: number | string,
  price: number | string
}
