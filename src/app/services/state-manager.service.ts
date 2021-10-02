import { Injectable } from '@angular/core';
import { Product, ProductsMock } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class StateManagerService {
  public currentState!: Product[];
  constructor() {
    this.getDataFromLocal();
  }

  getDataFromLocal(): Product[] {
    const localData = localStorage.getItem('state');
    if (typeof localData === 'string') {
      this.currentState = <Product[]>JSON.parse(localData);
    } else {
      this.currentState = ProductsMock;
    }
    return this.currentState;
  }

  setDataToLocal(): void {
    localStorage.setItem('state', JSON.stringify(this.currentState));
  }
}
