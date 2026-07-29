import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Components/login/login';
import { Layout } from './Components/layout/layout';
import { SharedModule } from './Reutilizable/shared/shared-module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Layout, SharedModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AppSistemaVenta');
}
