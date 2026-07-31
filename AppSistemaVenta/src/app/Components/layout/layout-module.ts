import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing-module';
import { SharedModule } from '../../Reutilizable/shared/shared-module';


import { DashBoard } from './Pages/dash-board/dash-board';
import { Usuario } from './Pages/usuario/usuario';
import { Producto } from './Pages/producto/producto';
import { Venta } from './Pages/venta/venta';
import { HistorialVenta } from './Pages/historial-venta/historial-venta';
import { Reporte } from './Pages/reporte/reporte';

@NgModule({
  declarations: [
  ],

  imports: [CommonModule,
    LayoutRoutingModule,
    SharedModule,
    DashBoard,
    Usuario,
    Producto,
    Venta,
    HistorialVenta,
    Reporte
  ],
})
export class LayoutModule { }
