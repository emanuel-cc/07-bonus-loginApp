import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  usuario:UsuarioModel;
  recordarme:boolean = false;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'emanuel.antonio2211@gmail.com';

  }

  onSubmit(form:NgForm){
    if(form.invalid){
      return;
    }
    // console.log("Formulario enviado");
    // console.log(this.usuario);
    // console.log(form);
    this.authService.nuevoUsuario(this.usuario)
      .subscribe(resp =>{
        console.log(resp);
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },(err) =>{
        console.log(err.error.error.message);
      });
  }
}
