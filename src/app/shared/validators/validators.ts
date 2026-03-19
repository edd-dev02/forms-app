import { FormControl } from "@angular/forms";


export const cantBeStrider = (control: FormControl) => {

  const value: string = control.value.trim().toLowerCase();

  if (value === "strider") {

    // Regresaremos un objeto de error
    return {
      isStrider: true,
    }

  }

  return null;

}
