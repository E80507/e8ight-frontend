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
import { DeliveryStatus } from "@/app/api/dto/member";
import formattedDate from "@/util/date";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import {
  handleDeliveryStatusKRText,
  handleMaskName,
  handleMaskPhone,
  handlePrintStatusKRText,
} from "@/util/string";
import { DeliveryRes } from "@/app/api/dto/delivery";

interface DeliveryTableProps {
  data: DeliveryRes[];
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
}

export function DeliveryTable({
  data,
  currentPage,
  totalDataLength,
}: DeliveryTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<DeliveryRes>();
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
    columnHelper.accessor("deliveryNo", {
      cell: (data) => data.getValue(),
      header: "배송 번호",
    }),
    columnHelper.accessor("deliveryRequestedAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#2A67FF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "배송 신청일",
    }),
    columnHelper.accessor("deliveryPrice", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "배송비 결제 금액",
    }),
    columnHelper.accessor("quantity", {
      cell: (data) => handleCommaPrice(data.getValue(), "장"),
      header: "배송 수량",
    }),
    columnHelper.accessor("totalPrice", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "배송 상품 총액",
    }),
    columnHelper.accessor("ordererName", {
      cell: (data) => handleMaskName(data.getValue(), true),
      header: "주문자",
    }),
    columnHelper.accessor("recipientName", {
      cell: (data) => handleMaskName(data.getValue(), true),
      header: "수령자",
    }),
    columnHelper.accessor("recipientPhone", {
      cell: (data) => handleMaskPhone(data.getValue()),
      header: "수령자 전화번호",
    }),
    columnHelper.accessor("printStatus", {
      cell: (data) => handlePrintStatusKRText(data.getValue()),
      header: "출력 상태",
    }),
    columnHelper.accessor("deliveryStatus", {
      cell: (data) => (
        <div
          className={`min-w-[66px] ${data.getValue() === DeliveryStatus.WAITING ? "text-[#E85C40]" : ""}`}
        >
          {handleDeliveryStatusKRText(data.getValue())}
        </div>
      ),
      header: "출고 상태",
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
