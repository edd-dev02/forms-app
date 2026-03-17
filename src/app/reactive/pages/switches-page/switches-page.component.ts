import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './switches-page.component.html',
  styles: ``
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true, Validators.required], // Solo espera que haya un valor seleccionado
    termsAndConditions: [false, Validators.requiredTrue], // Espera que el valor seleccionado sea verdadero
  });

  public person = {
    gender: 'F',
    wantNotifications: false,
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm.reset(this.person);
  }

  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  // Obtener mensaje de error para campos normales
  getFieldError(field: string): string | null {

    // Si el campo no existe, no mostramos error
    if (!this.myForm.controls[field]) return null;

    // Obtenemos los errores del control
    // Si es null, usamos objeto vacío para evitar errores
    const errors = this.myForm.controls[field].errors || {};

    // Recorremos las posibles llaves de error
    for (const key of Object.keys(errors)) {

      switch (key) {

        case 'required':
          return "Este campo es requerido";

        case 'requiredtrue':
          return "Debe de aceptar las condiciones de uso";

      }

    }

    return null;

  }

  onSave() {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.error("Formulario inválido");
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson;

    console.log(this.myForm.value);
    console.log(this.person);

  }

}
