import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

usuario ={
  nombre:'',
  apellido:'',
  correo:''
}

  constructor() { }

  ngOnInit(): void {
  }

  guardar(forma: NgForm){

    console.log(forma)
    console.log(forma.value);
    console.log('nombre:' + forma.value.nombre +
     " Apellido: "+ forma.value.apellido +
      " Correo: " + forma.value.correo );
  }

}
