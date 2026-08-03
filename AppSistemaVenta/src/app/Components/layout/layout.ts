import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SharedModule } from '../../Reutilizable/shared/shared-module';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

import { Menu } from '../../Interfaces/menu';
import { MenuService } from '../../Services/menu.service';
import { Utilidad } from '../../Reutilizable/utilidad';

@Component({
  selector: 'app-layout',
  imports: [SharedModule, RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout implements OnInit {
  listaMenus: Menu[] = [];
  correoUsuario: string = '';
  rolUsuario: string = '';

  constructor(
    private router: Router,
    private _menuServicio: MenuService,
    private _utilidadServicio: Utilidad,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const usuario = this._utilidadServicio.obtenerSesionUsuario();
    console.log('Sesion usuario:', usuario);    // para debug

    if (usuario != null) {
      this.correoUsuario = usuario.correo;
      this.rolUsuario    = usuario.rolDescripcion;

      this._menuServicio.lista(usuario.idUsuario).subscribe({
        next: (data) => {
          console.log('Respuesta menús:', data);  // para debug
          if (data.status) {
            this.listaMenus = data.value;
            this.cdr.detectChanges();            // fuerza re-render del *ngFor
          } else {
            console.warn('API menús retornó status false:', data);
          }
        },
        error: (e) => {
          console.error('Error al cargar menús:', e);
        }
      });
    } else {
      // Si no hay sesión, redirigir al login
      this.router.navigate(['login']);
    }
  }

  cerrarSesion() {
    this._utilidadServicio.eliminarSesionUsuario();
    this.router.navigate(['login']);
  }
}
