import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login as LoginRequest } from '../../Interfaces/login';
import { UsuarioService } from '../../Services/usuario.service';
import { Utilidad } from '../../Reutilizable/utilidad';
import { SharedModule } from '../../Reutilizable/shared/shared-module';


@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: Utilidad

  ) {
    this.formularioLogin = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  ngOnInit(): void {

  }

  iniciarSesion() {
    this.mostrarLoading = true;
    const request: LoginRequest = {
      correo: this.formularioLogin.value.email,
      clave: this.formularioLogin.value.password
    }

    this._usuarioServicio.iniciarSesion(request).subscribe({
      next: (data) => {

        if (data.status) {
          this._utilidadServicio.guardarSesionUsuario(data.value);
          this.router.navigate(["pages"])
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron coincidencias", "Opps!")
        }

      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._utilidadServicio.mostrarAlerta("Hubo un error", "Opps!")
      }
    })
  }

}
