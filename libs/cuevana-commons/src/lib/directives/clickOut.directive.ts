import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';

@Directive({
  selector: '[clickOut]'
})
export class ClickOutDirective {
  readonly outside = output<HTMLElement>();
  readonly elementRef = inject(ElementRef<HTMLElement>);

  @HostListener('document:click', ['$event.target'])
  onMouseEnter(targetElement: HTMLElement) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.outside.emit(targetElement);
    }
  }

}