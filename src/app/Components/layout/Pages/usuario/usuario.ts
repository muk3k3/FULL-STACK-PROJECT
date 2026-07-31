import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ModalUsuario } from '../../Modals/modal-usuario/modal-usuario';
import { Usuario as UsuarioRequest } from '../../../../Interfaces/usuario';
import { UsuarioService } from '../../../../Services/usuario.service';
import { Utilidad } from '../../../../Reutilizable/utilidad';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    ModalUsuario,
  ],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario implements OnInit, AfterViewInit {

  columnasTable: string[] = ["nombreCompleto", "correo", "rolDescripcion", "estado", "acciones"];
  dataInicio: Usuario[] = [];
  dataListaUsuario = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: Utilidad
  ) {

  }

  obtenerUsuarios() {

    this._usuarioServicio.lista().subscribe({
      next: (data) => {
        if (data.status)
          this.dataListaUsuario.data = data.value;
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!")
      },
      error: (e) => { }
    })


  }

  ngOnInit(): void {

    this.obtenerUsuarios();

  }

  ngAfterViewInit(): void {
    this.dataListaUsuario.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaUsuario.filter = filterValue.trim().toLowerCase();
  }

  nuevoUsuario() {
    this.dialog.open(ModalUsuario, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") this.obtenerUsuarios();
    });

  }

  editarUsuario(usuario: UsuarioRequest) {
    this.dialog.open(ModalUsuario, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") this.obtenerUsuarios();
    });

  }

  eliminar(usuario: UsuarioRequest) {

    Swal.fire({
      title: "Desea eliminar el usuario?",
      text: usuario.nombreCompleto,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._usuarioServicio.eliminar(usuario.idUsuario).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("El usuario fue eliminado", "Listo!");
              this.obtenerUsuarios();
            } else
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el usuario", "Error");

          },
          error: (e) => { }
        })
      }
    })

  }



}
