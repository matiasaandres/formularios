import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Matías',
    apellido: 'Morales',
    correo: 'matias_andres@live.com',
    pais:'',
    genero:'M'
  };
  paises: any[] = [];

  constructor(private paisServices: PaisService) {}

  ngOnInit(): void {
    this.paisServices.getPaises().subscribe((paises) => {
      this.paises = paises; 
      this.paises.unshift(
        {
          nombre:'Selecciona un País',
          codigo:''
        }
      ); // unshift para agregar un valor, en este caso el primer valor por defecto de select de paises
 
    });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        // permite recorrer los campos del formulario con el objetivo de validar los campos
        control.markAsTouched(); // marca los campos como touched activando su validaciones
      });
      return;
    }
  }


}
