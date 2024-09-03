import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Column } from './models/column.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'ng-tabular',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tabular.component.html',
  styles: ``
})
export class NgTabularComponent implements OnChanges {
  @Input() columns: Column[] = [];
  @Input() rows: any[] = [];
  @Input() itemsPerPage: number = 10;
  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  filteredRows: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.searchTerm = value;
      this.reload();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges triggered:', changes);
    if (changes['rows'] || changes['columns']) {
      this.reload();
    }
  }

  onSearchChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  reload() {
    if (!this.searchTerm && this.searchTerm !== "") {
      this.filteredRows = this.rows;
    } else {
      this.filteredRows = this.rows.filter(row =>
        this.columns.some(column =>
          row[column.field]?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }
    this.sortRows();
    this.totalPages = Math.ceil(this.filteredRows.length / this.itemsPerPage);
    this.currentPage = 1;
  }

  sort(field: string) {
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

  get paginatedRows() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredRows.slice(startIndex, endIndex);
  }
}