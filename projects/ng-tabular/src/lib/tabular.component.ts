import { Component, Input } from '@angular/core';
import { Column } from './models/column.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ng-tabular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabular.component.html',
  styles: ``
})
export class NgTabularComponent {
  @Input()
  columns: Column[] = [];

  @Input() 
  rows: any[] = [];

}
