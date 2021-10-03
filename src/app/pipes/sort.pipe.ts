import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(value: Observable<Product[]>, sortKey?: string): any {
    if (!sortKey) {
      return value;
    }
    console.log(value);

    switch (sortKey) {
      case 'name':
        return value.pipe(
          map((items) => items.sort((a, b) => a.name.localeCompare(b.name)))
        );
      case 'creationDate':
        return value.pipe(
          map((items) =>
            items.sort(
              (a, b) =>
                new Date(b.creationDate).getTime() -
                new Date(a.creationDate).getTime()
            )
          )
        );
    }
  }
}
