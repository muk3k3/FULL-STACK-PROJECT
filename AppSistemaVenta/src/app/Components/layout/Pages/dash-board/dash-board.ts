import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { Chart, registerables } from 'chart.js';
import { DashBoardService } from '../../../../Services/dash-board.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dash-board',
  imports: [MatCardModule, MatIconModule, MatGridListModule],
  templateUrl: './dash-board.html',
  styleUrl: './dash-board.css',
})
export class DashBoard implements OnInit, AfterViewInit {
  totalIngresos: string  = '0';
  totalVentas: string    = '0';
  totalProductos: string = '0';

  // Flags para coordinar API + DOM
  private chartLabels: any[] = [];
  private chartData: any[]   = [];
  private viewReady  = false;
  private dataReady  = false;

  constructor(
    private _dashboardServicio: DashBoardService,
    private cdr: ChangeDetectorRef          // <-- fuerza el re-render
  ) {}

  // ─── Se ejecuta cuando el canvas ya está en el DOM ───────────────────────
  ngAfterViewInit(): void {
    this.viewReady = true;
    if (this.dataReady) {
      this.mostrarGrafico(this.chartLabels, this.chartData);
    }
  }

  // ─── Pide los datos al backend ────────────────────────────────────────────
  ngOnInit(): void {
    this._dashboardServicio.resumen().subscribe({
      next: (data) => {
        if (data.status) {
          this.totalIngresos  = String(data.value.totalIngresos);
          this.totalVentas    = String(data.value.totalVentas);
          this.totalProductos = String(data.value.totalProductos);

          // Fuerza que Angular actualice la vista con los nuevos valores
          this.cdr.detectChanges();

          const arrayData: any[] = data.value.ventasUltimaSemana;
          this.chartLabels = arrayData.map((v) => v.fecha);
          this.chartData   = arrayData.map((v) => v.total);
          this.dataReady   = true;

          if (this.viewReady) {
            this.mostrarGrafico(this.chartLabels, this.chartData);
          }
        } else {
          console.warn('API respondió con status false:', data);
        }
      },
      error: (err) => {
        console.error('Error al llamar a la API del Dashboard:', err);
      }
    });
  }

  // ─── Crea (o re-crea) el gráfico destruyendo la instancia previa ─────────
  mostrarGrafico(labelGrafico: any[], dataGrafico: any[]): void {
    const existing = Chart.getChart('chartBarras');
    if (existing) {
      existing.destroy();
    }

    new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelGrafico,
        datasets: [{
          label: '# de Ventas',
          data: dataGrafico,
          backgroundColor: 'rgba(54,162,235,0.2)',
          borderColor: 'rgba(54,162,235,1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
