import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  products$!: Observable<Product[]>;
  @ViewChild('inputSearch') inputSearch!: ElementRef;
  eventSub$!: Subscription;
  showEditor$ = this.storeService.showEditor;
  sortValue = 'name';
  selectedProduct!: Product | null;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductsData();
  }

  // detect if routing option with ID
  getProductsData() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id !== null && !isNaN(parseInt(id))) {
      this.products$ = this.storeService.products$.pipe(
        map((item) => item.filter((f) => id !== null && f.id == parseInt(id)))
      );
    } else {
      this.products$ = this.storeService.products$;
    }
  }

  ngAfterViewInit() {
    this.typeAheadListener();
  }

  // subscribe to input key up search observable
  typeAheadListener() {
    this.eventSub$ = fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        switchMap(async () =>
          this.filterList(this.inputSearch.nativeElement.value)
        )
      )
      .subscribe();
  }

  // filter list by type ahead string
  filterList(txt: string) {
    this.products$ = this.storeService.products$.pipe(
      map((item) =>
        item.filter(
          (f) =>
            f.name.toLocaleLowerCase().includes(txt.toLocaleLowerCase()) ||
            f.description.toLocaleLowerCase().includes(txt.toLocaleLowerCase())
        )
      )
    );
  }

  // open product editor for new product edit
  addNewProduct() {
    this.selectedProduct = null;
    this.showEditor$.next(true);
  }

  // single product list @output event emitter -- detect if enter to edit mode or delete item
  editProduct(event: string, product: Product) {
    if (event === 'delete') {
      this.showEditor$.next(false);
      this.storeService.deleteProduct(product);
    } else {
      this.selectedProduct = product;
      this.showEditor$.next(true);
    }
  }

  ngOnDestroy() {
    this.eventSub$.unsubscribe();
  }
}
