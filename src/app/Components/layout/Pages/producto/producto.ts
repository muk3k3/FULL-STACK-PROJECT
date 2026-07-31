import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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

import { ModalProducto } from '../../Modals/modal-producto/modal-producto';
import { Producto as ProductoRequest } from '../../../../Interfaces/producto';
import { ProductoService } from '../../../../Services/producto.service';
import { Utilidad } from '../../../../Reutilizable/utilidad';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-producto',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    ModalProducto,
  ],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class Producto implements OnInit, AfterViewInit {

  columnasTable: string[] = ["nombre", "categoria", "stock", "precio", "estado", "acciones"];
  dataInicio: Producto[] = [];
  dataListaProductos = new MatTableDataSource(this.dataInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;


  constructor(
    private dialog: MatDialog,
    private _productoServicio: ProductoService,
    private _utilidadServicio: Utilidad
  ) { }

  obtenerProductos() {

    this._productoServicio.lista().subscribe({
      next: (data) => {
        if (data.status)
          this.dataListaProductos.data = data.value;
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!")
      },
      error: (e) => { }
    })
  }

  ngOnInit(): void {

    this.obtenerProductos();

  }

  ngAfterViewInit(): void {
    this.dataListaProductos.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataListaProductos.filter = filterValue.trim().toLowerCase();
  }

  nuevoProducto() {
    this.dialog.open(ModalProducto, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") this.obtenerProductos();
    });
  }

  editarProducto(usuario: ProductoRequest) {
    this.dialog.open(ModalProducto, {
      disableClose: true,
      data: usuario
    }).afterClosed().subscribe(resultado => {
      if (resultado == "true") this.obtenerProductos();
    });

  }

  eliminarProducto(producto: ProductoRequest) {

    Swal.fire({
      title: "Desea eliminar el producto?",
      text: producto.nombre,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "No, volver"
    }).then((resultado) => {
      if (resultado.isConfirmed) {
        this._productoServicio.eliminar(producto.idProducto).subscribe({
          next: (data) => {
            if (data.status) {
              this._utilidadServicio.mostrarAlerta("El producto fue eliminado", "Listo!");
              this.obtenerProductos();
            } else
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar el producto", "Error");

          },
          error: (e) => { }
        })
      }
    })

  }

}
