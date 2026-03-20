import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  // Validaciones del campo name
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

  // Validaciones del campo email
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value: string = control.value.trim().toLowerCase();

    if (value === "strider") {

      // Regresaremos un objeto de error
      return {
        isStrider: true,
      }

    }

    return null;

  }

  public isValidField( form: FormGroup, field: string ): boolean | null {

    return form.controls[field].errors && form.controls[field].touched;

  }

}
