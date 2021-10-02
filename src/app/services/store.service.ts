import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Product } from '../models/product';
import { StateManagerService } from './state-manager.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private products = this.stateManager.getDataFromLocal();
  private productsSubject$ = new BehaviorSubject<Product[]>(this.products);

  constructor(private stateManager: StateManagerService) {}

  get products$() {
    return this.productsSubject$.asObservable();
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

  sortList(str: string) {}
}
