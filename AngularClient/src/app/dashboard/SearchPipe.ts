import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'customerEmailFilter',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =
        val.taskname.includes(args) ||
        val.description.includes(args) ||
        val.assigneto.includes(args) ||
        val.assignedate.includes(args) ||
        val.status.includes(args);
      return rVal;
    });
  }
}
