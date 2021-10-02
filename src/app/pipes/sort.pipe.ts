import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Observable<Product[]>, sortKey?: string): any {

    console.log(sortKey)
    if (!value || !sortKey) { return []; }

    switch (sortKey) {
      case 'name':
        console.log(value.pipe(map(items => items.sort((a, b) => a.name.localeCompare(b.name)))))
        return value.pipe(map(items => items.sort((a, b) => a.name.localeCompare(b.name))))
      case 'creationDate':
        console.log(value.pipe(map(items => items.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime()))))
        return value.pipe(map(items => items.sort((a, b) => b.creationDate.getTime() - a.creationDate.getTime())))
    }

  }

}
