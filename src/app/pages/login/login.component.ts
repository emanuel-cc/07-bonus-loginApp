import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

// import Swal from 'sweetalert2';
// import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel = new UsuarioModel();
  recordarme:boolean = false;
  
  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  loginForm(form:NgForm){
    if(form.invalid){
      return;
    }
    // Swal.fire({
    //   allowOutsideClick: false,
    //   icon: 'success',
    //   text: 'Espere por favor...'
    // });
    // Swal.showLoading();
    // console.log("Imprimir si el formulario es válido");
    // console.log(form);
    // console.log(this.usuario);
    
    this.authService.login(this.usuario)
      .subscribe(resp =>{
        console.log(resp);
        if(this.recordarme){
          localStorage.setItem('email',this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },err=>{
        console.log(err.error.error.message);
      });
  }

}
