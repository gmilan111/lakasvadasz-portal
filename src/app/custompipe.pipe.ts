import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  standalone: true,
  name: 'custompipe'
})
export class CustompipePipe implements PipeTransform {
  nvalue: any;
  transform(value: any, ...args: unknown[]): any {
    this.nvalue = value.split('').reverse().join('');
    return this.nvalue;
  }
}
