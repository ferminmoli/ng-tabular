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

  tableConfigPaginationOnly: Config = {
    enablePagination: true,
    defaultPageSize: 5
  };

  tableConfigSortingOnly: Config = {
    enableSorting: true,
    enablePagination: true,
    defaultPageSize: 5
  };

  tableConfigGlobalFilterOnly: Config = {
    enableSorting: true,
    enablePagination: true,
    enableGlobalSearchBox: true,
    defaultPageSize: 5
  };

  tableConfigColumnFilterOnly: Config = {
    enableSorting: true,
    enablePagination: true,
    enableColumnSearchBox: true,
    defaultPageSize: 5
  };

  
  tableConfigAll: Config = {
    enableSorting: true,
    enableFiltering: true,
    enableSearchBox: true,
    enablePagination: true,
    enableGlobalSearchBox: true,
    enableColumnSearchBox: true,
    defaultPageSize: 5
  };

  ngOnInit() {
    this.columns = [
      { field: "first_name", headerName: "Name" },
      { field: "last_name", headerName: "Last Name" },
      { field: "email", headerName: "Email" },
      { field: "dob", headerName: "Date of Birth"},
      { field: "available", headerName: "Available?", dataType: "boolean"} 
    ];

    
    this.rows = new MockData().get();
  }
}
