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
import formattedDate from "@/util/date";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import { handleUseStatusKRText, handleUseTypeKRText } from "@/util/string";
import { PointChargeStatus, PointUsageRes } from "@/app/api/dto/point";

interface PointUseTableProps {
  data: PointUsageRes[];
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
}

export function PointUseTable({
  data,
  currentPage,
  totalDataLength,
}: PointUseTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<PointUsageRes>();
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
    columnHelper.accessor("transactionNo", {
      cell: (data) => data.getValue(),
      header: "포인트 사용번호",
    }),
    columnHelper.accessor("transactionDate", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#2A67FF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "포인트 사용일",
    }),
    columnHelper.accessor("transactionType", {
      cell: (data) => handleUseTypeKRText(data.getValue()),
      header: "사용 유형",
    }),
    columnHelper.accessor("artworkNo", {
      cell: (data) => data.getValue() || "-",
      header: "구매한 작품번호",
    }),
    columnHelper.accessor("quantity", {
      cell: (data) =>
        data.getValue() ? handleCommaPrice(data.getValue()) : "-",
      header: "구매 수량",
    }),
    columnHelper.accessor("amount", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "사용 금액",
    }),
    columnHelper.accessor("balance", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "사용 후 잔액",
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        const isCanceled = data.getValue() === PointChargeStatus.CANCELLED;
        return (
          <p className={isCanceled ? "text-[#E85C40]" : ""}>
            {handleUseStatusKRText(data.getValue())}
          </p>
        );
      },
      header: "사용 상태",
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
    <Table className="min-w-[1100px]">
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
