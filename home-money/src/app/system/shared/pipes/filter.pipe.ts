import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class filterPipe implements PipeTransform {
  transform(items, value, field){
    if(items.lenght === 0 || !value){
      return items
    }

    return items.filter((i) => {
      const t = Object.assign({}, i)
      if(!isNaN(t[field])){
        t[field] += ''
      }
      if(field === 'type'){
        t[field] = t[field] === 'income' ? 'доход' : 'расход'
      }
      if(field === 'category'){
        t[field] = t['catName']
      }
      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    })
  }
}
