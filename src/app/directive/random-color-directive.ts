import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[randomColor]',
    host: {
      '(click)': 'onClick()'
    }
})
export class RandomColorDirective {
    constructor(private element: ElementRef, private renderer: Renderer) {
      this.updateColor();
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.updateColor();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.updateColor();
    }

    getColor() {
      return "#"+((1<<24)*Math.random()|0).toString(16);
    }

    onClick() {
      this.updateColor("lightgrey");
      window.setTimeout(() => this.updateColor(),1000);
    }

    updateColor(color = this.getColor()) {
      this.renderer.setElementStyle(this.element.nativeElement, 'color', color);
    }
}