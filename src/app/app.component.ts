import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SampleAngularProject';
  loadedFeature: string = 'recipe';

  onNavigate(event: string) {
    this.loadedFeature = event;
  }
}
