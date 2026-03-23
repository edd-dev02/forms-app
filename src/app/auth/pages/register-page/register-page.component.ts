import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {


  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService, private emailValidator: EmailValidator) { }

  public myForm: FormGroup = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)

    ]],
    //email: ["", [ Validators.required, Validators.email] ],
    email: [
      "",
      [
        Validators.required,
        Validators.pattern(this.validatorsService.emailPattern),

      ],
      // [ new EmailValidator() ]
      [ this.emailValidator ] // Tiene mejor performance y evita la creacion de muchas instancias
    ],
    username: ["", [Validators.required, this.validatorsService.cantBeStrider]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    password2: ["", [Validators.required]],
  }, {
    validators: [
      this.validatorsService.isFiledOneEqualFieldTwo("password", "password2")
    ]
  }
);

  public isValidField(field: string): boolean | null {

    return this.validatorsService.isValidField(this.myForm, field)

  }

  public onSubmit(): void {

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.error("Invalid form");
      return;
    }

  }


}
