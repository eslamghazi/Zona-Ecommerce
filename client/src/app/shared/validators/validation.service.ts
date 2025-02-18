import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {

  // Required Field Validator
  requiredField(customMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value?.trim()) {
        return this.handleError('requiredField', customMessage || 'This field is required');
      }
      return null;
    };
  }

  // Email Validator
  email(customMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(control.value)) {
        return this.handleError('email', customMessage || 'Invalid email address');
      }
      return null;
    };
  }

  // Minimum Length Validator
  minLength(min: number, customMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value?.length < min) {
        return this.handleError(
          'minLength',
          customMessage || `Minimum ${min} characters required`
        );
      }
      return null;
    };
  }

  // Number Validator (Allows only digits)
  number(customMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!/^[0-9]*$/.test(control.value)) {
        return this.handleError('number', customMessage || 'Only numbers are allowed');
      }
      return null;
    };
  }

  // Phone Number Validator (International Format)
  phone(customMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(control.value)) {
        return this.handleError('phone', customMessage || 'Invalid phone number format');
      }
      return null;
    };
  }

  // Custom Validator
  customValidator(
    validatorFn: (value: any) => boolean,
    errorKey: string,
    customMessage?: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!validatorFn(control.value)) {
        return this.handleError(errorKey, customMessage || 'Invalid input');
      }
      return null;
    };
  }

  // ✅ New Validator for Select Inputs
  selectionValidator(invalidValue: any, customMessage?: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === invalidValue) {
        return this.handleError(
          'selectionError',
          customMessage || 'Invalid selection'
        );
      }
      return null;
    };
  }

  // Helper method to handle errors dynamically
  private handleError(key: string, message: string): ValidationErrors {
    return { [key]: message, showError: true };
  }
}
