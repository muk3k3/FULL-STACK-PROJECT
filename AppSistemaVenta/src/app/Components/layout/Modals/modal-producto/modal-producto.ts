import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { Categoria } from '../../../../Interfaces/categoria';
import { Producto } from '../../../../Interfaces/producto';
import { CategoriaService } from '../../../../Services/categoria.service';
import { ProductoService } from '../../../../Services/producto.service';
import { Utilidad } from '../../../../Reutilizable/utilidad';

@Component({
  selector: 'app-modal-producto',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './modal-producto.html',
  styleUrl: './modal-producto.css',
})
export class ModalProducto implements OnInit {

  formularioProducto: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaCategorias: Categoria[] = [];


  constructor(
    private modalActual: MatDialogRef<ModalProducto>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private fb: FormBuilder,
    private _categoriaServicio: CategoriaService,
    private _productoServicio: ProductoService,
    private _utilidadServicio: Utilidad

  ) {

    this.formularioProducto = this.fb.group({
      nombre: ["", Validators.required],
      idCategoria: ["", Validators.required],
      stock: ["", Validators.required],
      precio: ["", Validators.required],
      esActivo: ["1", Validators.required]
    });

    if (this.datosProducto != null) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._categoriaServicio.lista().subscribe({
      next: (data) => {
        if (data.status) this.listaCategorias = data.value
      },
      error: (e) => { }
    })


  }

  ngOnInit(): void {

    if (this.datosProducto != null) {

      this.formularioProducto.patchValue({

        nombre: this.datosProducto.nombre,
        idCategoria: this.datosProducto.idCategoria,
        stock: this.datosProducto.stock,
        precio: this.datosProducto.precio,
        esActivo: this.datosProducto.esActivo.toString()

      });

    }
  }

  guardarEditar_Producto() {
    const _producto: Producto = {
      idProducto: this.datosProducto == null ? 0 : this.datosProducto.idProducto,
      nombre: this.formularioProducto.value.nombre,
      idCategoria: this.formularioProducto.value.idCategoria,
      descripcionCategoria: "",
      precio: this.formularioProducto.value.precio,
      stock: this.formularioProducto.value.stock,
      esActivo: parseInt(this.formularioProducto.value.esActivo),
    }

    if (this.datosProducto == null) {
      this._productoServicio.guardar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El producto fue registrado", "Exito");
            this.modalActual.close("true")
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el producto", "Error")
          }
        },

        error: (e) => { }
      })
    } else {
      this._productoServicio.editar(_producto).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("El producto fue editado", "Exito");
            this.modalActual.close("true")
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo editar el producto", "Error")
          }
        },

        error: (e) => { }
      })

    }


  }

}
