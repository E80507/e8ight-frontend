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
import { handlePostCategoryText } from "@/util/string";
import { Post } from "@/api/dto/post";
import Check from "@/components/shared/check";
import formattedDate from "@/util/date";

interface AdminTableProps {
  data: Post[];
  totalCount: number;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function AdminTable({
  data,
  totalCount,
  selectedIds,
  setSelectedIds,
}: AdminTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<Post>();

  // 단일 체크박스 핸들러
  const handleCheckboxChange = (rowId: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId],
    );
  };

  // 페이지 별 전체 선택 여부
  const areAllPageItemsSelected = () => {
    if (data.length === 0) return false;
    const currentPageIds = data.map((item) => item.id);
    console.log(totalCount);
    return currentPageIds.every((id) => selectedIds.includes(id));
  };

  // 전체 체크박스 핸들러
  const handleSelectAll = () => {
    if (areAllPageItemsSelected()) {
      const currentPageIds = data.map((item) => item.id);
      setSelectedIds((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      const currentPageIds = data.map((item) => item.id);
      setSelectedIds((prevSelected) => [...prevSelected, ...currentPageIds]);
    }
  };

  // 관리자 테이블 컬럼 정의
  const columns = [
    columnHelper.display({
      id: "select",
      header: () => (
        <div className="my-auto flex items-center justify-center">
          <input
            type="checkbox"
            checked={areAllPageItemsSelected()}
            onChange={handleSelectAll}
            className="peer absolute opacity-0 size-[20px] cursor-pointer z-10"
          />
          <Check type={"square"} isChecked={areAllPageItemsSelected()} />
        </div>
      ),
      cell: ({ row }) => (
        <div className="my-auto flex items-center justify-center">
          <input
            type="checkbox"
            checked={selectedIds.includes(row.original.id)}
            onChange={() => {
              row.toggleSelected();
              handleCheckboxChange(row.original.id);
            }}
            className="peer absolute opacity-0 size-[20px] cursor-pointer z-10"
          />
          <Check
            type={"square"}
            isChecked={selectedIds.includes(row.original.id)}
          />
        </div>
      ),
      size: 44,
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => formattedDate(data.getValue(), "INPUT_DATE"),
      header: "등록일",
      size: 217,
    }),
    columnHelper.accessor("title", {
      cell: (data) => data.getValue(),
      header: "제목",
      size: 556,
    }),
    columnHelper.accessor("category", {
      cell: (data) => handlePostCategoryText(data.getValue()),
      header: "카테고리",
      size: 217,
    }),
    columnHelper.accessor("author", {
      cell: (data) => data.getValue() || "-",
      header: "저자",
      size: 160,
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

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header, headerIndex) => {
              return (
                <TableHead key={header.id + headerIndex}>
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
                  className={`h-[45px] ${selectedIds.includes(row.original.id) ? "bg-[#FFF6F6]" : ""} border-t ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
                  key={cell.id + cellIndex}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell className="h-[45px]" size="lg" colSpan={columns.length}>
              데이터가 존재하지 않습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
