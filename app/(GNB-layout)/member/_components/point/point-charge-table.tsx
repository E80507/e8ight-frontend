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
import {
  handleChargeStatusKRText,
  handleRefundableKRText,
} from "@/util/string";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  PointChargeRes,
  PointChargeStatus,
  TransactionPurpose,
} from "@/app/api/dto/point";

interface PointChargeTableProps {
  data: PointChargeRes[];
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
}

export function PointChargeTable({
  data,
  currentPage,
  totalDataLength,
}: PointChargeTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<PointChargeRes>();
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
      header: "충전 번호",
    }),
    columnHelper.accessor("transactionDate", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#2A67FF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "충전일",
    }),
    columnHelper.accessor("purpose", {
      cell: (data) => {
        const isSignUpCharge =
          data.getValue() === TransactionPurpose.SIGNUP_RECHARGE;
        return isSignUpCharge ? "회원가입 충전" : "일반 충전";
      },
      header: "충전 유형",
    }),
    columnHelper.accessor("paidAmount", {
      cell: (data) => {
        const isSignUpCharge =
          data.row.original.purpose === TransactionPurpose.SIGNUP_RECHARGE; // 회원가입 이벤트 충전 여부
        return isSignUpCharge ? "-" : handleCommaPrice(data.getValue(), "원");
      },
      header: "실제 지불 금액",
    }),
    columnHelper.accessor("amount", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "충전 금액",
    }),
    columnHelper.accessor("balance", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "충전 후 잔액",
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        const isCancelStatus = data.getValue() === PointChargeStatus.CANCELLED;
        return (
          <p
            className={`${isCancelStatus ? "text-[#E85C40]" : ""} min-w-[66px]`}
          >
            {handleChargeStatusKRText(data.getValue())}
          </p>
        );
      },
      header: "충전 상태",
    }),
    columnHelper.accessor("isRefundable", {
      cell: (data) => (
        <div className="min-w-[66px]">
          {data.getValue() ? "가능" : "불가능"}
        </div>
      ),
      header: "환불 가능 여부",
    }),
    columnHelper.accessor("isRefunded", {
      cell: (data) => {
        const refundStatus =
          data.getValue() !== null
            ? handleRefundableKRText(data.row.original.status)
            : "-";
        return <div className="min-w-[66px]">{refundStatus}</div>;
      },
      header: "환불 상태",
    }),
    columnHelper.accessor("receiptUrl", {
      cell: (data) => {
        const receipt = data.getValue();
        // 영수증이 없는 경우
        if (!receipt) return "-";

        return (
          <Button
            type="button"
            className="mx-auto"
            size={"sm"}
            variant={"outline-black"}
          >
            <Link target="_blank" href={receipt}>
              보기
            </Link>
          </Button>
        );
      },
      header: "영수증",
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
