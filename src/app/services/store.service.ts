import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Product } from '../models/product';
import { StateManagerService } from './state-manager.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private products: Product[] = [];
  public showEditor = new BehaviorSubject<boolean>(false);

  constructor(private stateManager: StateManagerService) {
    this.products = this.stateManager.getDataFromLocal();
  }

  get products$() {
    return of(this.products);
  }

  createNewProduct(product: Product) {
    this.products.push(product);
    this.stateManager.setDataToLocal(this.products)
  }

  updateProduct(product: Product) {
    const index = this.products.findIndex((obj) => obj.id == product.id);
    this.products[index] = product;
    this.stateManager.setDataToLocal(this.products)
  }

  deleteProduct(product: Product) {
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    this.stateManager.setDataToLocal(this.products)
  }

  getMaxId(): number {
    if (this.products.length === 0) { return 1 }
    return Math.max.apply(Math, this.products.map((product) => { return product.id; }))
  }
}
