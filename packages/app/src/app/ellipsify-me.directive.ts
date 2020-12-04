import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit, HostBinding } from '@angular/core';
@Directive({
  selector: '[appEllipsifyMe]'
})
export class EllipsifyMeDirective implements AfterViewInit {
  @HostListener('window:resize', ['$event.target'])
  @HostBinding('class.sb-text-ellipsis') ellipsis = true;
  domElement: any;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.domElement = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.renderer.setProperty(this.domElement, 'scrollTop', 1);
    this.setToolTip();
  }
  setToolTip() {
    (this.domElement.offsetWidth < this.domElement.scrollWidth) ?
      this.renderer.setAttribute(this.domElement,
        'title', this.domElement.textContent) :
      this.renderer.removeAttribute(this.domElement, 'title');
  }
}
