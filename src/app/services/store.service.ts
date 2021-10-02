import { Injectable } from '@angular/core';
import { BehaviorSubject, of, } from 'rxjs';

import { Product } from '../models/product';
import { StateManagerService } from './state-manager.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private products = this.stateManager.getDataFromLocal();

  constructor(private stateManager: StateManagerService) { }

  get products$() {
    return of(this.products);
  }

  createNewProduct(product: Product) {
    this.products.push(product);
  }

  editProduct(product: Product) {
    const index = this.products.findIndex((obj) => obj.id == product.id);
    this.products[index] = product;
  }

  deleteProduct(product: Product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 0);
  }

  getMaxId(): number {
    if (this.products.length === 0) { return 1 }
    return Math.max.apply(Math, this.products.map((product) => { return product.id; }))
  }
}
