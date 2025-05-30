import * as React from "react";
import {
  SortingState,
  VisibilityState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { handleCommaPoint } from "@/util/price";
import { ProfitRes } from "@/app/api/dto/profit";

interface ProfitTableProps {
  data: ProfitRes[];
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
}

export function ProfitTable({
  data,
  currentPage,
  totalDataLength,
}: ProfitTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<ProfitRes>();
  const columns = [
    columnHelper.display({
      header: "No.",
      cell: (data) => {
        const itemsPerPage = table.getState().pagination.pageSize;
        return (
          totalDataLength - (currentPage - 1) * itemsPerPage - data.row.index
        );
      },
    }),
    columnHelper.accessor("revenueNo", {
      cell: (data) => data.getValue(),
      header: "수익 번호",
    }),
    columnHelper.accessor("revenueYear", {
      cell: (data) => `${data.getValue()}-${data.row.original.revenueMonth}`,
      header: "수익연월",
    }),
    columnHelper.accessor("artworkNo", {
      cell: (data) => data.getValue(),
      header: "수익 작품 번호",
    }),
    columnHelper.accessor("saledAmount", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "수익 금액",
    }),
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <Table className="min-w-[1200px]">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, headerIndex) => {
              return (
                <TableHead
                  className={headerIndex === 0 ? "border-x" : "border-r"}
                  key={header.id + headerIndex}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow
              key={row.id + rowIndex}
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <TableCell
                  size="sm"
                  className={`${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                  key={cell.id + cellIndex}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              className="h-[200px] subtitle-1"
              size="lg"
              colSpan={columns.length}
            >
              데이터가 존재하지 않습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
