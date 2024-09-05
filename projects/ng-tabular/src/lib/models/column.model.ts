export type ColumnType = 'string' | 'number' | 'date' | 'boolean';
export interface Column {
  field: string;
  headerName?: string;
  type?: ColumnType;
  dataType?: string;
}