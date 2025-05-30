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
import {
  handleReportReasonKRText,
  handleReportStatusText,
} from "@/util/string";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReportRes, ReportTarget } from "@/app/api/dto/report";

interface ReportTableProps {
  data: ReportRes[];
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
}

export function ReportTable({
  data,
  currentPage,
  totalDataLength,
}: ReportTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<ReportRes>();
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
    columnHelper.accessor("reportNo", {
      cell: (data) => data.getValue(),
      header: "신고 번호",
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#2A67FF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "신고 접수일",
    }),
    columnHelper.accessor("target", {
      cell: (data) => {
        const targetText =
          data.getValue() === ReportTarget.ARTIST ? "작가" : "작품";
        return targetText;
      },
      header: "신고 대상",
    }),
    columnHelper.accessor("artistId", {
      cell: (data) => data.getValue(),
      header: "신고된 작가 ID",
    }),
    columnHelper.accessor("targetNo", {
      cell: (data) => data.getValue() ?? "-",
      header: "신고된 피드번호(작품/공지)",
    }),
    columnHelper.accessor("reportReason", {
      cell: (data) => handleReportReasonKRText(data.getValue()),
      header: "신고 유형",
    }),
    columnHelper.accessor("description", {
      cell: (data) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="mx-auto w-full max-w-[230px] truncate">
                {data.getValue()}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-[300px]">{data.getValue()}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      header: "신고 사유",
    }),
    columnHelper.accessor("isResolved", {
      cell: (data) => (data.getValue() ? "처리" : "접수"),
      header: "신고 상태",
    }),
    columnHelper.accessor("resolution", {
      cell: (data) => {
        const status = data.getValue()
          ? handleReportStatusText(data.getValue())
          : "-";
        return status;
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
                  className={`max-w-[200px] ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
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
