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
import Pagination from "@/app/_components/pagination";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { handleMaskEmail, handlePointChargeStatusText } from "@/util/string";

import Link from "next/link";
import { POINT_CHARGE_PAGE } from "@/constants/path";
import formattedDate from "@/util/date";
import { PointChargeRes, TransactionPurpose } from "@/app/api/dto/point";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import { useEffect } from "react";
interface PointChargeTableProps {
  data: PointChargeRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
  totalChargeAmount: number; // 총 충전 금액
}

export function PointChargeTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
  totalChargeAmount,
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
      header: "포인트 충전 번호",
    }),
    columnHelper.accessor("transactionDate", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#4C7FFF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "포인트 충전일",
    }),
    columnHelper.accessor("purpose", {
      cell: (data) =>
        data.getValue() === TransactionPurpose.SIGNUP_RECHARGE
          ? "회원가입 충전"
          : "일반 충전",
      header: "충전 유형",
    }),
    columnHelper.accessor("email", {
      cell: (data) =>
        data.getValue() ? handleMaskEmail(data.getValue()) : "-",
      header: "충전한 회원 이메일",
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
      header: "충전 금액 잔여",
    }),
    columnHelper.accessor("status", {
      cell: (data) => handlePointChargeStatusText(data.getValue()),
      header: "충전 상태",
    }),
    columnHelper.accessor("receiptUrl", {
      cell: (data) =>
        data.getValue() && (
          <Link
            target="_blank"
            onClick={(e) => e.stopPropagation()}
            href={data.getValue()}
            className="relative z-10 rounded-sm border px-3 py-1"
          >
            상세보기
          </Link>
        ),
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
        pageSize: 10,
      },
    },
  });
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("prev", currentPage.toString());
    window.history.replaceState({}, "", url.toString());
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
        desc={`(합계 ${handleCommaPrice(totalChargeAmount, "원")})`}
        currentDataLen={data.length}
        totalDataLen={totalDataLength}
      />
      <Table className="min-w-[1500px]">
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
                    className={`cursor-pointer ${cell.column.id === "content" ? "w-[330px]" : ""} ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    <Link
                      prefetch={false}
                      className={`relative flex size-full w-full items-center justify-center`}
                      href={`${POINT_CHARGE_PAGE}/${row.original.id}?prev=${currentPage}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
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
      {data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
