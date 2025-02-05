import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventListComponent, HeaderComponent } from '@datnek-app/events';



@Component({
  standalone: true,
  imports: [RouterModule, HeaderComponent, EventListComponent],
  selector: 'datnek-app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'datnek-app';
}