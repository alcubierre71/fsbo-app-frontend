import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'fsbo-home',
  standalone: true,
  imports: [
    RouterModule, 
    MatCardModule, 
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
    console.log("Starting Home page...");
  }

}
