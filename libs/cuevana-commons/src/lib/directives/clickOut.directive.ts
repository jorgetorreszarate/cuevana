import { Directive, ElementRef, HostListener, output } from '@angular/core';

@Directive({
  selector: '[clickOut]'
})
export class ClickOutDirective {

  constructor(private elementRef: ElementRef) { }

  readonly outside = output<HTMLElement>();

  @HostListener('document:click', ['$event.target'])
  onMouseEnter(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.outside.emit(targetElement);
    }
  }

}