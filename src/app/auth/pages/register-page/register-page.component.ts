import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from '../../../shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {


  constructor(private fb: FormBuilder) {}

  public myForm: FormGroup = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.pattern(CustomValidators.firstNameAndLastnamePattern)

    ]],
    //email: ["", [ Validators.required, Validators.email] ],
    email: ["", [
      Validators.required,
      Validators.pattern(CustomValidators.emailPattern),

    ] ],
    username: ["", [ Validators.required, CustomValidators.cantBeStrider ] ],
    password: ["", [ Validators.required, Validators.minLength(6)] ],
    password2: ["", [ Validators.required, ] ],
  });

  public isValidField( field: string ): void {

    // TODO: Obtener validación desde un servicio

  }

  public onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.error("Invalid form");
      return;
    }

  }


}
