import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Column, Config, NgTabularComponent } from '../../projects/ng-tabular/src/public-api';
import { MockData } from './data';

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

  tableConfig: Config = {
    enableSorting: true,
    enableFiltering: true,
    enableSearchBox: true,
    enablePagination: true,
    pageSizeOptions: [10, 20, 50],
    defaultPageSize: 3
  };

  ngOnInit() {
    this.columns = [
      { field: "first_name", headerName: "Nombre" },
      { field: "last_name", headerName: "Apellido" },
      { field: "email", headerName: "Email" },
      { field: "dob", headerName: "Fecha de Nacimiento"},
      { field: "available", headerName: "¿Disponible?", dataType: "boolean"} 
    ];

    
    this.rows = new MockData().get();
  }
}
