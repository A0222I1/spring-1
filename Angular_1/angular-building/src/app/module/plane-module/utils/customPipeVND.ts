import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name:'CustomPipeVND'
})
export class CustomPipeVND implements PipeTransform{
  transform(value: number): string {
    return value.toLocaleString() +"VNĐ";
  }

}
