import { Component } from '@angular/core';
import { SharedModule } from '../../Reutilizable/shared/shared-module';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [SharedModule, RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout { }
