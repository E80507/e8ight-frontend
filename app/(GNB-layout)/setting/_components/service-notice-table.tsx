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
import Link from "next/link";
import { SETTING_PAGE } from "@/constants/path";
import formattedDate from "@/util/date";
import { ServiceNoticeRes } from "@/app/api/dto/setting";
import TooltipRow from "@/app/_components/table/tooltip-row";
import Image from "next/image";
import { useEffect } from "react";
interface ServiceNoticeTableProps {
  data: ServiceNoticeRes[];
  currentPage: number;
  selectedIds: string[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ServiceNoticeTable({
  data,
  currentPage,
  setCurrentPage,
  selectedIds,
  setSelectedIds,
}: ServiceNoticeTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<ServiceNoticeRes>();

  // 단일 체크박스 핸들러
  const handleCheckboxChange = (rowId: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId],
    );
  };

  const areAllPageItemsSelected = () => {
    if (data.length === 0) return false;
    const currentPageIds = data.map((item) => item.id);
    return currentPageIds.every((id) => selectedIds.includes(id));
  };

  const handleSelectAll = () => {
    if (areAllPageItemsSelected()) {
      // If all items on the current page are selected, deselect them
      const currentPageIds = data.map((item) => item.id);
      setSelectedIds((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      // If not all items are selected, select all items on the current page
      const currentPageIds = data.map((item) => item.id);
      setSelectedIds((prevSelected) => [...prevSelected, ...currentPageIds]);
    }
  };

  const columns = [
    columnHelper.display({
      id: "select",
      header: () => (
        <div className="my-auto flex items-center justify-center">
          <input
            type="checkbox"
            checked={areAllPageItemsSelected()}
            onChange={handleSelectAll}
          />
        </div>
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.original.id)}
          onChange={() => {
            row.toggleSelected();
            handleCheckboxChange(row.original.id);
          }}
        />
      ),
    }),
    columnHelper.display({
      id: "no",
      header: "No.",
      cell: (filedData) => {
        const itemsPerPage = table.getState().pagination.pageSize;
        return (
          data.length - (currentPage - 1) * itemsPerPage - filedData.row.index
        );
      },
    }),
    columnHelper.accessor("file", {
      cell: (data) => (
        <div>
          {data.getValue() ? (
            <Image
              src={data.getValue()}
              alt="공지 이미지"
              width={80}
              height={80}
              className="size-20"
            />
          ) : (
            "-"
          )}
        </div>
      ),
      header: "공지 이미지",
    }),
    columnHelper.accessor("announcementNo", {
      cell: (data) => data.getValue(),
      header: "서비스 공지 번호",
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#4C7FFF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "서비스 공지 등록일",
    }),
    columnHelper.accessor("title", {
      cell: (data) => (
        <div className="absolute inset-x-0 mx-0">
          <TooltipRow text={data.getValue()} />
        </div>
      ),
      header: "공지 제목",
    }),
    columnHelper.accessor("isVisible", {
      cell: (data) => (data.getValue() ? "노출" : "-"),
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
    <Table className="min-w-[1500px]">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, headerIndex) => (
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
            ))}
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
                  className={`${cell.column.id === "select" ? "cursor-default" : "cursor-pointer"} ${
                    cell.column.id === "title" ? "min-w-[400px]" : ""
                  } ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${
                    rowIndex === table.getRowModel().rows.length - 1
                      ? "border-b"
                      : ""
                  } ${selectedIds.includes(row.original.id) ? "bg-[#FFF6F6]" : ""}`}
                  key={cell.id + cellIndex}
                >
                  {cell.column.id === "select" ? (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  ) : (
                    <Link
                      className="relative flex size-full min-h-[100px] w-full items-center justify-center"
                      href={`${SETTING_PAGE}/${row.original.id}?prev=${currentPage}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
                  )}
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
