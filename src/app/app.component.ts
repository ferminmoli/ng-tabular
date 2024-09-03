import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgTabularComponent } from '../../projects/ng-tabular/src/public-api';
import { Column } from '../../projects/ng-tabular/src/lib/models/column.model'; // Adjust the path as needed

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgTabularComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ng-tabular';

  columns: Column[] = [];
  rows: any[] = [];

  ngOnInit() {
    this.columns = [
      { field: 'name' },
      { field: 'last' },
      { field: 'nick' },
      { field: 'age' } 
    ];

    this.rows = [
      { name: 'Fermin', last: "oli", nick: "Ferr", age: "1" },
      { name: 'Fermin', last: "Moli", nick: "Ferr", age: "13" },
      { name: 'Fermin', last: "Moli", nick: "Ferr", age: "31" },
    ];
  }
}
