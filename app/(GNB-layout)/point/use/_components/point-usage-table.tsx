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
import {
  handleMaskEmail,
  handlePointChargeStatusText,
  handlePointUsageTypeText,
} from "@/util/string";

import Link from "next/link";
import { POINT_USE_PAGE } from "@/constants/path";
import formattedDate from "@/util/date";
import { PointUsageRes } from "@/app/api/dto/point";
import { handleCommaPoint } from "@/util/price";
import { useEffect } from "react";
interface PointUsageTableProps {
  data: PointUsageRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function PointUsageTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: PointUsageTableProps) {
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
      header: "포인트 사용 번호",
    }),
    columnHelper.accessor("transactionDate", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#4C7FFF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "포인트 사용일",
    }),
    columnHelper.accessor("transactionType", {
      cell: (data) => handlePointUsageTypeText(data.getValue()),
      header: "사용 유형",
    }),
    columnHelper.accessor("email", {
      cell: (data) =>
        data.getValue() ? handleMaskEmail(data.getValue()) : "-",
      header: "사용한 회원 이메일",
    }),
    columnHelper.accessor("artworkNo", {
      cell: (data) => data.getValue(),
      header: "구매한 작품번호",
    }),
    columnHelper.accessor("quantity", {
      cell: (data) => data.getValue(),
      header: "구매 수량",
    }),
    columnHelper.accessor("amount", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "사용 금액",
    }),
    columnHelper.accessor("balance", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "사용 후 잔여",
    }),
    columnHelper.accessor("status", {
      cell: (data) => handlePointChargeStatusText(data.getValue(), true),
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
        pageSize: 10,
      },
    },
  });
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("prev", currentPage.toString());
    window.history.replaceState({}, "", url.toString());
  }, [currentPage]);

  useEffect(() => {
    const url = new URL(window.location.href);
    const prevParam = url.searchParams.get("prev");
    if (prevParam) {
      setCurrentPage(Number(prevParam));
    }
  });

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryText
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
                      href={`${POINT_USE_PAGE}/${row.original.id}?prev=${currentPage}`}
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
