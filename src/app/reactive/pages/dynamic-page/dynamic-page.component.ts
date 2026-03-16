import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  // Formulario principal
  // favoriteGames es un FormArray → permite tener controles dinámicos
  public myForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],

    // FormArray para manejar lista dinámica de juegos favoritos
    favoriteGames: this.fb.array([

      // Cada elemento del array es un FormControl
      ["Metal Gear", Validators.required],
      ["Halo 3", Validators.required],

    ])
  });

  public newFavorite: FormControl = new FormControl("", Validators.required);

  // Inyectamos FormBuilder para crear formularios más fácil
  constructor(private fb: FormBuilder) { }

  // Getter para obtener el FormArray de favoriteGames
  // Se usa getter para no repetir this.myForm.get(...)
  get favoriteGames() {
    return this.myForm.get("favoriteGames") as FormArray;
  }

  // Validación para campos normales del FormGroup
  // Retorna true si el campo tiene errores y fue tocado
  isValidField(field: string): boolean | null {
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched;
  }

  // Validar campos del formulario dinámicos (FormArray)
  // Recibimos el FormArray y el índice del control a validar
  isValidFieldInArray(formArray: FormArray, index: number) {

    // Accedemos al control por índice
    // y verificamos si tiene errores y si fue tocado
    return formArray.controls[index].errors && formArray.controls[index].touched;

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

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;

      }

    }

    return null;

  }

  onAddToFavorites(): void {

    if(this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    // this.favoriteGames.push(new FormControl(newGame, Validators.required))
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset();

  }

  onDeleteFavorite(index : number): void {

    // Utilizamos el getter
    this.favoriteGames.removeAt(index);
  }

  onSubmit(): void {

    // Si el formulario es inválido
    // marcamos todos los campos como touched
    // para que se muestren los errores
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // Si todo es válido mostramos el valor
    console.log(this.myForm.value);

    // Resetear formulario
    // ⚠️ reset limpia valores pero también estados
    this.myForm.reset();

  }

}
