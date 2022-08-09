import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currentusertask'
})
export class CurrentusertaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal =
        val.taskname.includes(args) 
      return rVal;
    });
  }

}