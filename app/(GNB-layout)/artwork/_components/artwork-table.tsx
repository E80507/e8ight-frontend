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
import formattedDate from "@/util/date";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import { handleMaskEmail } from "@/util/string";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import {
  handleArtworkExposureStatusKRText,
  handleArtworkStatusKRText,
  handleMaskName,
} from "@/util/string";
import {
  ArtworkDirection,
  ArtworkRes,
  ArtworkStatus,
} from "@/app/api/dto/artwork";
import Image from "next/image";
import Link from "next/link";
import { ARTWORK_PAGE } from "@/constants/path";
import { useEffect } from "react";

interface ArtworkTableProps {
  data: ArtworkRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function ArtworkTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: ArtworkTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<ArtworkRes>();
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
    columnHelper.accessor("artworkImage", {
      cell: (data) => {
        const isHorizontal =
          data.row.original.imageDirection === ArtworkDirection.HORIZONTAL;
        return (
          <div
            className={`relative ${isHorizontal ? "h-[70px]" : "h-[100px]"} mx-auto border`}
            style={{
              aspectRatio: isHorizontal ? "105/70" : "66/100",
            }}
          >
            <Image src={data.getValue()} alt="작품 사진" fill />
          </div>
        );
      },
      header: "작품 이미지",
    }),
    columnHelper.accessor("artworkNo", {
      cell: (data) => <div className="min-w-[100px]">{data.getValue()}</div>,
      header: "작품 번호",
    }),
    columnHelper.accessor("artistId", {
      cell: (data) => <div className="min-w-[100px]">{data.getValue()}</div>,
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
    columnHelper.accessor("createdAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#4C7FFF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "작품 등록일",
    }),
    columnHelper.accessor("expiresAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#E85C40]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "작품 만료일",
    }),
    columnHelper.accessor("likeCount", {
      cell: (data) => handleCommaPrice(data.getValue(), "개"),
      header: "좋아요",
    }),
    columnHelper.accessor("totalSaleCount", {
      cell: (data) => handleCommaPrice(data.getValue(), "회"),
      header: "누적 출력 횟수",
    }),
    columnHelper.accessor("totalSaleRevenue", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "누적 출력 포인트",
    }),
    columnHelper.accessor("reportCount", {
      cell: (data) => handleCommaPrice(data.getValue(), "회"),
      header: "누적 신고횟수",
    }),
    columnHelper.accessor("status", {
      cell: (data) => {
        const isActive = data.getValue() === ArtworkStatus.ACTIVE;
        return (
          <p className={isActive ? "" : "text-[#E85C40]"}>
            {handleArtworkStatusKRText(data.getValue())}
          </p>
        );
      },
      header: "작품 상태",
    }),
    columnHelper.accessor("isBlocked", {
      cell: (data) => handleArtworkExposureStatusKRText(data.getValue()),
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
        pageSize: 5,
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
                    size="md"
                    className={`cursor-pointer ${
                      cell.column.id === "artworkImage" ? "min-w-[131px]" : ""
                    } ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                    key={cell.id + cellIndex}
                  >
                    <Link
                      className="flex size-full h-[150px] items-center justify-center"
                      href={`${ARTWORK_PAGE}/${row.original.id}?prev=${currentPage}`}
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
