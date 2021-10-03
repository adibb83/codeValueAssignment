import { Injectable } from '@angular/core';
import { Product, ProductsMock } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class StateManagerService {

  getDataFromLocal(): Product[] {
    const localData = localStorage.getItem('state');
    if (typeof localData === 'string') {
      return <Product[]>JSON.parse(localData);
    } else {
      return ProductsMock;
    }
  }

  setDataToLocal(products: Product[]): void {
    localStorage.setItem('state', JSON.stringify(products));
  }
}
