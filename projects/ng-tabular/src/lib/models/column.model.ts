export type ColumnType = 'string' | 'number' | 'date' | 'boolean';
export interface Column {
  field: string;
  headerName?: string;
  type?: ColumnType;
  // sortable?: boolean;
  // filterable?: boolean;
  // hidden?: boolean;
  // width?: string;
  dataType?: string;
}