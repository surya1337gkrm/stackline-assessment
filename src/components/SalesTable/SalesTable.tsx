import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  ColumnDef,
  SortingState,
  flexRender,
} from '@tanstack/react-table';
import { Sale } from '../../utils/types';

interface SalesTableProps {
  data: Sale[];
}

const SalesTable: React.FC<SalesTableProps> = ({ data }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columns = React.useMemo<ColumnDef<Sale>[]>(
    () => [
      {
        header: 'WEEK ENDING',
        accessorKey: 'weekEnding',
      },
      {
        header: 'RETAIL SALES',
        accessorKey: 'retailSales',
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      },
      {
        header: 'WHOLESALE SALES',
        accessorKey: 'wholesaleSales',
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      },
      {
        header: 'UNITS SOLD',
        accessorKey: 'unitsSold',
        cell: (info) => info.getValue().toLocaleString(),
      },
      {
        header: 'RETAILER MARGIN',
        accessorKey: 'retailerMargin',
        cell: (info) => `$${info.getValue().toLocaleString()}`,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className='p-2 bg-white shadow-md'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className='px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hover:cursor-pointer'
                  onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-4 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex items-center justify-between mt-4'>
        <div className='flex gap-2'>
          <button
            className='px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-200 hover:cursor-pointer'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}>
            First
          </button>
          <button
            className='px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-200 hover:cursor-pointer'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <button
            className='px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-200 hover:cursor-pointer'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </button>
          <button
            className='px-4 py-2 text-sm font-medium text-gray-700  hover:bg-gray-200 hover:cursor-pointer'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}>
            Last
          </button>
        </div>
        <div className='flex items-center gap-4'>
          <span className='text-sm text-gray-700'>
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </span>
          <select
            className='px-2 py-1 text-sm text-gray-700 bg-gray-100 rounded-md'
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SalesTable;
