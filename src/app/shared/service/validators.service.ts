import { ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

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

  public isFiledOneEqualFieldTwo(field1: string, field2: string) {

    return ( formGroup: FormGroup ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if(fieldValue1 !== fieldValue2) {

        formGroup.get(field2)?.setErrors({ notEqual : true })
        return { notEqual: true }

      }

      formGroup.get(field2)?.setErrors(null)

      return null;

    }

  }

}
