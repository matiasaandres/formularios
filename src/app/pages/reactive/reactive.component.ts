import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma: FormGroup;

  constructor(private fb: FormBuilder, private validador: ValidadoresService) {
    this.crearFormulario();
    this.cargarDatosFormulario();
  }

  ngOnInit(): void {}

  crearFormulario() {
    this.forma = this.fb.group(
      {
        // validaciones de campos
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            this.validador.noHerrera,
          ],
        ], // noHerrera es una validador personaliazado
        pass1: ['', Validators.required],
        pass2: ['', Validators.required],
        usuario:['', , this.validador.existeUsuario],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        direccion: this.fb.group({
          region: ['', [Validators.required, Validators.minLength(5)]],
          comuna: ['', [Validators.required, Validators.minLength(5)]],
        }),

        pasatiempos: this.fb.array([]),
      },
      {
        validators: this.validador.passwordsIguales('pass1', 'pass2'),
      }
    );
  }

  // cargar datos al formulario
  cargarDatosFormulario() { 
    //this.forma.setValue({
    this.forma.reset({
      nombre: 'matias',
      apellido: 'Morales',
      correo: 'matias_andres@live.com',
      direccion: {
        region: 'Metropolitana',
        comuna: 'Paine',
      },
    });
  }

  // obtener el arreglo de los pasatiempos

  get obtenerPasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  // obtener el estado de los campos y verificar si son validos o no

  get nombreNoValido() {
    return (
      this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }

  get apellidoNoValido() {
    return (
      this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
    );
  }

  get correoNoValido() {
    return (
      this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
    );
  }
  get usuarioNoValido() {
    return (
      this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
    );
  }
  get regionNoValido() {
    return (
      this.forma.get('direccion.region')?.invalid &&
      this.forma.get('direccion.region')?.touched
    );
  }

  get comunaNoValido() {
    return (
      this.forma.get('direccion.comuna')?.invalid &&
      this.forma.get('direccion.comuna')?.touched
    );
  }
  get pass1NoValido() {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;

    return pass1 === pass2 ? false : true;
  }

  agregarPasatiempo() {
    this.obtenerPasatiempos.push(
      this.fb.control('Nuevo Elemento', Validators.required)
    );
  }

  eliminarPasatiempo(i: number) {
    this.obtenerPasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);

    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((control) =>
            control.markAsTouched()
          );
        } else {
          control.markAllAsTouched();
        }
      });
    }

    // resetea el formulario y aplico un valor por defecto al campo nombre
    this.forma.reset({
      nombre: 'Sin Nombre',
    });
  }
}
