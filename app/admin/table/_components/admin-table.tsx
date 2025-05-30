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
import {
  handleAdminCategoryText,
} from "@/util/string";
import { AdminRes } from "@/app/api/dto/admin";

interface AdminTableProps {
  data: AdminRes[]; // 필터링 된 데이터
  totalData: AdminRes[]; // 전체 데이터
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function AdminTable({
  data,
  totalData,
  currentPage,
  totalDataLength,
  selectedIds,
  setSelectedIds,
}: AdminTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<AdminRes>();

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
    if (totalData.length === 0) return false;
    const currentPageIds = totalData.map((item) => item.techBlogId);
    return currentPageIds.every((id) => selectedIds.includes(id));
  };

  // 전체 체크박스 핸들러
  const handleSelectAll = () => {
    if (areAllPageItemsSelected()) {
      const currentPageIds = totalData.map((item) => item.techBlogId);
      setSelectedIds((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      const currentPageIds = totalData.map((item) => item.techBlogId);
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
          />
        </div>
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.original.techBlogId)}
          onChange={() => {
            row.toggleSelected();
            handleCheckboxChange(row.original.techBlogId);
          }}
        />
      ),
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => new Date(data.getValue()).toLocaleDateString(),
      header: "등록일",
    }),
    columnHelper.accessor("title", {
      cell: (data) => data.getValue(),
      header: "제목",
    }),
    columnHelper.accessor("category", {
      cell: (data) => handleAdminCategoryText(data.getValue()),
      header: "카테고리",
    }),
    columnHelper.accessor("writer", {
      cell: (data) => data.getValue(),
      header: "저자",
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
                  className={`${selectedIds.includes(row.original.purchasedArtworkId) ? "bg-[#FFF6F6]" : ""} ${cell.column.id === "content" ? "w-[330px]" : ""} ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
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
