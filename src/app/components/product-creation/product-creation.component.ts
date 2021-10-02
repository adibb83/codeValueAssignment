import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.scss']
})
export class ProductCreationComponent implements OnInit {
  @Input('product') product!: Product | null;
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService) { }

  ngOnInit(): void {
    this.createProductForm();
    this.product ? this.setFormData() : this.newProduct()
  }

  get name() {
    return this.productForm.get('name') as FormControl
  }

  get description() {
    return this.productForm.get('description') as FormControl
  }

  get price() {
    return this.productForm.get('price') as FormControl
  }

  createProductForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      description: ['', [Validators.maxLength(200)]],
      price: ['', [Validators.required, Validators.min(1)]],
    })
  }

  setFormData() {
    this.name.setValue(this.product?.name);
    this.description.setValue(this.product?.description);
    this.price.setValue(this.product?.price);
  }

  newProduct() {
    this.name.setValue('new product');
    this.price.setValue(1);
  }


  save() {
    this.product ? this.updateProduct() : this.createNewProduct()
  }


  updateProduct() {
    if (this.product) {
      this.product.name = this.name.value;
      this.product.description = this.description.value;
      this.product.price = this.price.value;
      this.storeService.editProduct(this.product);
    }
  }

  createNewProduct() {
    const temp: Product = {
      id: this.storeService.getMaxId() + 1,
      name: this.name.value,
      description: this.description.value,
      price: this.price.value,
      creationDate: new Date
    }
    this.storeService.createNewProduct(temp);
  }

}




