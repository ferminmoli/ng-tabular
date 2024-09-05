import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Column } from './models/column.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Config } from './models/config.model';

@Component({
  selector: 'ng-tabular',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tabular.component.html',
  styles: ``
})
export class NgTabularComponent implements OnInit, OnChanges {
  @Input() columns: Column[] = [];
  @Input() rows: any[] = [];
  @Input() config: Config = {};

  globalSearchTerm: string = "";
  searchTerms: { [key: string]: string } = {};

  sortColumn: string = "";
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredRows: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  pageSize: number = 10;

  private searchSubject = new Subject<string>();

  constructor() {}

  ngOnInit() {
    if (this.config.enablePagination) {
      this.pageSize = this.config.defaultPageSize || 10;
    }

    this.columns.forEach(column => {
      this.searchTerms[column.field] = '';
    });

    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.globalSearchTerm = value;
      this.applyFilters();
    });

    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);  
  }

  loadData() {
    if (this.globalSearchTerm.trim() === "") {
      this.filteredRows = this.rows;
    } else {
      this.filteredRows = this.rows.filter(row =>
        this.columns.some(column =>
          row[column.field]?.toString().toLowerCase().includes(this.globalSearchTerm.toLowerCase())
        )
      );
    }
    this.sortRows();
    this.totalPages = Math.ceil(this.filteredRows.length / this.pageSize);
    this.currentPage = 1;
  }

  sort(field: string) {
    if (!this.config.enableSorting) return;

    this.sortDirection = this.sortColumn === field && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortColumn = field;
    this.sortRows();
  }

  sortRows() {
    if (this.sortColumn) {
      this.filteredRows.sort((a, b) => {
        if (a[this.sortColumn] < b[this.sortColumn]) return this.sortDirection === 'asc' ? -1 : 1;
        if (a[this.sortColumn] > b[this.sortColumn]) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
  }

  onColumnSearchChange(columnField: string, searchValue: string): void {
    this.searchTerms[columnField] = searchValue;
    this.applyFilters();
  }

  applyFilters(){
    this.filteredRows = this.rows.filter(row => {
      const globalMatch = Object.values(row).some(value =>
        value
          ?.toString()
          .toLowerCase()
          .includes(this.globalSearchTerm.toLowerCase())
      );

      const columnMatch = this.columns.every(column =>
        row[column.field]
          ?.toString()
          .toLowerCase()
          .includes(this.searchTerms[column.field].toLowerCase())
      );

      return globalMatch && columnMatch;
    });
  }

  formatData(value: any): any {
    if (typeof(value) === 'boolean') {
      return value ? 'Yes' : 'No'; // Format boolean
    }
    return value;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  goToPage(page: number){
    this.currentPage = page;
  }
  
  get paginatedRows() {
    if(!this.config.enablePagination){
      return this.filteredRows;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredRows.slice(startIndex, endIndex);
  }
}