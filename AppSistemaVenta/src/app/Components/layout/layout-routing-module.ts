import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { DashBoard } from './Pages/dash-board/dash-board';
import { Usuario } from './Pages/usuario/usuario';
import { Producto } from './Pages/producto/producto';
import { Venta } from './Pages/venta/venta';
import { HistorialVenta } from './Pages/historial-venta/historial-venta';
import { Reporte } from './Pages/reporte/reporte';
import { Layout } from './layout';

const routes: Routes = [{

  path: '',
  component: Layout,
  children: [
    { path: 'dashboard', component: DashBoard },
    { path: 'usuarios', component: Usuario },
    { path: 'productos', component: Producto },
    { path: 'venta', component: Venta },
    { path: 'historial_venta', component: HistorialVenta },
    { path: 'reportes', component: Reporte },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }
