import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './functions/shared/components/toolbar/toolbar.component';

@Component({
  selector: 'fsbo-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'fsbo-app';
}
