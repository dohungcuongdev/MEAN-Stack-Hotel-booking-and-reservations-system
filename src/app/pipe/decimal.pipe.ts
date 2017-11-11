import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core";

@Pipe({name: 'decimal'}) //pipe only allow 2 decimal number
export class DecimalPipe implements PipeTransform {

    transform(value:any) {
        if (value == null || typeof value == undefined || isNaN(value)) {
            return 0;
        }
        if(typeof value == 'number' && value%1 != 0)
            return value.toFixed(2);
        return value;
    }

}