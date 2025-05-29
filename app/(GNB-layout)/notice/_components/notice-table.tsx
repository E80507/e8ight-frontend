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
import { handleCommaPrice } from "@/util/price";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import {
  handleMaskName,
  handleNoticeStatusKRText,
  handleMaskEmail,
} from "@/util/string";

import Link from "next/link";
import { NOTICE_PAGE } from "@/constants/path";
import { NoticeRes, NoticeStatus } from "@/app/api/dto/notice";
import formattedDate from "@/util/date";
import TooltipRow from "@/app/_components/table/tooltip-row";
import { useEffect } from "react";
interface NoticeTableProps {
  data: NoticeRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function NoticeTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: NoticeTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<NoticeRes>();
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
    columnHelper.accessor("noticeNo", {
      cell: (data) => data.getValue(),
      header: "공지 번호",
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#4C7FFF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "공지 등록일",
    }),
    columnHelper.accessor("artistId", {
      cell: (data) => data.getValue(),
      header: "작가 ID",
    }),
    columnHelper.accessor("nickname", {
      cell: (data) => handleMaskName(data.getValue() ?? "-"),
      header: "작가 닉네임",
    }),
    columnHelper.accessor("email", {
      cell: (data) => handleMaskEmail(data.getValue() ?? "-"),
      header: "작가 이메일",
    }),
    columnHelper.accessor("content", {
      cell: (data) => {
        return (
          <div className="absolute inset-x-0 mx-0">
            <TooltipRow text={data.getValue()} />
          </div>
        );
      },
      header: "공지 내용",
    }),
    columnHelper.accessor("likeCount", {
      cell: (data) => handleCommaPrice(data.getValue(), "개"),
      header: "좋아요",
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        const isActive = data.getValue() === NoticeStatus.ACTIVE;
        return (
          <p className={isActive ? "" : "text-[#E85C40]"}>
            {handleNoticeStatusKRText(data.getValue())}
          </p>
        );
      },
      header: "공지 상태",
    }),
    columnHelper.accessor("isBlocked", {
      cell: (data) => {
        const isBlocked = data.getValue() ? "비공개" : "공개";
        return isBlocked;
      },
      header: "처리 상태",
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
                      className={`relative flex size-full w-full items-center justify-center`}
                      href={`${NOTICE_PAGE}/${row.original.id}?prev=${currentPage}`}
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
