import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as CustomValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {


  constructor(private fb: FormBuilder, private validatorsService: ValidatorsService) {}

  public myForm: FormGroup = this.fb.group({
    name: ["", [
      Validators.required,
      Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)

    ]],
    //email: ["", [ Validators.required, Validators.email] ],
    email: ["", [
      Validators.required,
      Validators.pattern(this.validatorsService.emailPattern),

    ] ],
    username: ["", [ Validators.required, this.validatorsService.cantBeStrider ] ],
    password: ["", [ Validators.required, Validators.minLength(6)] ],
    password2: ["", [ Validators.required, ] ],
  });

  public isValidField( field: string ): boolean | null {

    return this.validatorsService.isValidField(this.myForm, field)

  }

  public onSubmit(): void {

    if(this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.error("Invalid form");
      return;
    }

  }


}
