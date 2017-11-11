import {Pipe} from "@angular/core";
import {PipeTransform} from "@angular/core";

@Pipe({name: 'convertdate'}) //pipe convert any to date
export class ConvertDatePipe implements PipeTransform {

    transform(value:any) {
        if (value) {
            return new Date(value);
        }
        return value;
    }

}