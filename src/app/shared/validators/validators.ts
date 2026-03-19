import { FormControl, ValidationErrors } from "@angular/forms";

// Validaciones del campo name
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';

// Validaciones del campo email
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const cantBeStrider = (control: FormControl): ValidationErrors | null => {

  const value: string = control.value.trim().toLowerCase();

  if (value === "strider") {

    // Regresaremos un objeto de error
    return {
      isStrider: true,
    }

  }

  return null;

}
