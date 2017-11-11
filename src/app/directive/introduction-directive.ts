import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[introDirective]' })
export class IntroDirective {

    color = "black"

    constructor(el: ElementRef) {
       el.nativeElement.style.color = this.color;
    }
}