import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {

  constructor() { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({email});

    const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {

      console.log({email});

      if(email === "eduardo@google.com") {
        subscriber.next({ emailTaken: true });
        subscriber.complete();
        return;
      }

      subscriber.next(null);
      subscriber.complete();

    }).pipe(
      delay(1500)
    );

    return httpCallObservable;

    // La forma en la que realizariamos la consulta al backend, seria la siguiente:
    /*
    return this.http.get<any[]>(`http://localhost:3000/users?q=${ email }`)
      .pipe(
        map( resp => {
          return ( resp.length === 0 ) ? null : { emailTaken: true }
        })
      );
    */



  }

  /*
  validate(control: AbstractControl): Observable<ValidationErrors | null> {

    const email = control.value;
    console.log({email});

    return of({
      emailTaken: true
    })

  }
    */

}
