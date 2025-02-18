import { Directive, Input, OnInit, ComponentFactoryResolver, ViewContainerRef, ElementRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessagesComponent } from './validation-messages.component';

@Directive({
  selector: '[appAutoValidation]',
  standalone: true
})
export class AutoValidationDirective implements OnInit {
  @Input('appAutoValidation') control!: AbstractControl;
  @Input() label: string = '';  // Accept label as input to pass to validation messages

  constructor(
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.addValidationMessages();
    this.control.statusChanges?.subscribe(() => {
      this.updateMessages();
    });
  }

  // Add the validation messages component dynamically
  private addValidationMessages() {
    const factory = this.resolver.resolveComponentFactory(ValidationMessagesComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    componentRef.instance.control = this.control;
    componentRef.instance.label = this.label;  // Pass the label to the component

    // Append the validation message component after the input element
    const parent = this.el.nativeElement.parentElement;
    parent.appendChild(componentRef.location.nativeElement);
  }

  // Update error messages based on validation errors
  private updateMessages() {
    if (this.control.errors && this.el?.nativeElement?.nextSibling?.style?.display) {
      this.el.nativeElement.nextSibling.style.display = 'block';
    } else {
      if (this.el?.nativeElement?.nextSibling?.style?.display)
        this.el.nativeElement.nextSibling.style.display = 'none';
    }
  }
}
