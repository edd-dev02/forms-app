import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const product = {
  name: "RTX-5090",
  price: 1500,
  inStorage: 1
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

  /**
  public myForm: FormGroup = new FormGroup({

    Valor 1: Valor por defecto - Valor 2: Validación síncrona - Valor 3: Validacion asíncrona
    Validacion síncrona: si es más de una, va entre corchetes []

    name: new FormControl('', [], []),
    price: new FormControl(0, [], []),
    inStorage: new FormControl(0, [], []),
  });
  */

  constructor( private fb: FormBuilder ) {}

  ngOnInit(): void {

    // Al cargar el componente por primera vez, estos seran los valores iniciales de los campos
    //this.myForm.reset( product );
  }

  isValidField(field: string ): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  getFieldError(field: string): string | null{

    if(!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {}; // Si es nulo, retornamos un objeto vacío

    for (const key of Object.keys(errors)) {

      switch(key) {
        case 'required':
          return "Este campo es requerido";

        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`;
      }

    }

    return null;

  }

  // Sintaxis mas elegante, es lo mismo que el bloque de arriba
  public myForm: FormGroup = this.fb.group({
    name: ["" , [ Validators.required, Validators.minLength(3) ] ],
    price: [0 , [Validators.required, Validators.min(1)] ],
    inStorage: [0, [ Validators.required, Validators.min(1) ] ],
  });

  onSave(): void {

    if(this.myForm.invalid) {

      // Activa todas las validaciones
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);

    // Restablece el formulario a los valores iniciales (Valid, Pristine, Touched)
    // Se omiten los campos string porque por defecto, los restablece sin valores
    this.myForm.reset({ price: 0, inStorage: 0 });
  }

}
