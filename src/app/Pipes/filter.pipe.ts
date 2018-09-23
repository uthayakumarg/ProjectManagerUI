import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: any): any {
    if (!items) return [];
    if (!searchTerm) return items;
    return items.filter(item => {
      for (let key in item) {
        if (("" + item[key]).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

}
