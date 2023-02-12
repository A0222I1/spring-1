import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'pipeCurrencyCustom'})
export class PipeCurrencyCustomPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString() + "đ";
  }
}
