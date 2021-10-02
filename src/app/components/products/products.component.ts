import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subscriber, Subscription } from 'rxjs';
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

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.products$ = this.storeService.products$;
  }

  ngAfterViewInit() {
    this.eventSub$ = fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(150),
        distinctUntilChanged(),
        switchMap(async () =>
          this.filterList(this.inputSearch.nativeElement.value)
        ),
        tap(() => {
          console.log(this.inputSearch.nativeElement.value);
        })
      )
      .subscribe();
  }

  filterList(txt: string) {
    this.products$ = this.storeService.products$.pipe(
      map((item) =>
        item.filter(
          (f) =>
            f.name.toLocaleLowerCase().includes(txt) ||
            f.description.toLocaleLowerCase().includes(txt)
        )
      )
    );
  }
  editProduct(event: string, product: Product) {
    console.log(event);
    event === 'delete'
      ? this.storeService.deleteProduct(product)
      : this.storeService.editProduct(product);
  }

  ngOnDestroy() {
    this.eventSub$.unsubscribe();
  }
}
