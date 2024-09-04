export interface Config {
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enableSearchBox?: boolean;
  enablePagination?: boolean;
  pageSizeOptions?: number[];
  defaultPageSize?: number;
  enableRowSelection?: boolean;
  enableColumnResize?: boolean;
  [key: string]: any;
}