import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({ name: 'orderby' }) //pipe sort array descending order
export class OrderByPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
        array.sort((a: any, b: any) => {
            if (a[field] > b[field]) {
                return -1;
            } else if (a[field] < b[field]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}