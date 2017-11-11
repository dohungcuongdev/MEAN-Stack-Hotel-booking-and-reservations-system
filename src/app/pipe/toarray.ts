import { Pipe } from "@angular/core";
import { PipeTransform } from "@angular/core";

@Pipe({ name: 'toarray' }) //pipe convert any to array
export class ToArrayPipe implements PipeTransform {
    transform(size: any) {
        if (typeof size != "number")
            size = Number(size);
        return (new Array(size)).fill(1);
    }
}