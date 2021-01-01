import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { rejects } from 'assert';
import { Observable } from 'rxjs';



interface ErrorValidate{
  [s:string] : boolean
}

@Injectable({
  providedIn: 'root',
})
export class ValidadoresService {



  constructor() {}

  existeUsuario(control : FormControl) : Promise <ErrorValidate> | Observable<ErrorValidate>{

    return new Promise((resolve,reject) =>{

      setTimeout(() => {

           if(control.value === 'matias'){

            resolve({Eexiste:true})
           }
           else{
             resolve(null);
           }

      },3500);
    });
  }

  // metodo para validar el valor especifico del campo apellido

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value?.toLowerCase() === 'herrera') {
      return { noHerrera: true };
    }

    return null;
  }
// metodo para validar si pass2 es igual que pass1 
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }
}


