import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-messages',
  standalone: true,
  template: `
  @if (control && control.errors && (control.dirty || control.touched)) {
    <div>
    @for (error of getErrorMessages(); track $index) {
      <span class="error-text">
      {{ label ? label + ': ' : '' }}{{ error }}
          </span>
    }
    </div>
  }

  `,
  styles: [`.error-text { color: red; font-size: 12px; display: block; }`]
})
export class ValidationMessagesComponent {
  @Input() control!: AbstractControl;
  @Input() label: string = ''; // You can pass the label dynamically

  // Get error messages based on control errors
  getErrorMessages(): string[] {
    const errors = this.control?.errors;
    return errors ? Object.values(errors).filter(val => typeof val === 'string') : [];
  }

  trackByIndex(index: number) {
    return index;  // Optional, just helps Angular with trackBy optimization
  }
}
