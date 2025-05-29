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
  handleArtworkCategoryKRText,
  handleMaskEmail,
  handlePrintStatusKRText,
} from "@/util/string";
import { OrderRes } from "@/app/api/dto/order";

interface OrderTableProps {
  data: OrderRes[]; // 필터링 된 데이터
  totalData: OrderRes[]; // 전체 데이터
  currentPage: number;
  totalDataLength: number; // 총 데이터 수
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function OrderTable({
  data,
  totalData,
  currentPage,
  totalDataLength,
  selectedIds,
  setSelectedIds,
}: OrderTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<OrderRes>();

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
    const currentPageIds = totalData.map((item) => item.purchasedArtworkId);
    return currentPageIds.every((id) => selectedIds.includes(id));
  };

  // 전체 체크박스 핸들러
  const handleSelectAll = () => {
    if (areAllPageItemsSelected()) {
      const currentPageIds = totalData.map((item) => item.purchasedArtworkId);
      setSelectedIds((prevSelected) =>
        prevSelected.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      const currentPageIds = totalData.map((item) => item.purchasedArtworkId);
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
          checked={selectedIds.includes(row.original.purchasedArtworkId)}
          onChange={() => {
            row.toggleSelected();
            handleCheckboxChange(row.original.purchasedArtworkId);
          }}
        />
      ),
    }),
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
    columnHelper.accessor("artworkNo", {
      cell: (data) => data.getValue(),
      header: "출력 작품번호",
    }),
    columnHelper.accessor("email", {
      cell: (data) =>
        data.getValue() ? handleMaskEmail(data.getValue()) : "-",
      header: "배송 신청 회원 이메일",
    }),
    columnHelper.accessor("printCategory", {
      cell: (data) => handleArtworkCategoryKRText(data.getValue()),
      header: "굿즈 유형",
    }),
    columnHelper.accessor("quantity", {
      cell: (data) => data.getValue(),
      header: "출력 수량",
    }),
    columnHelper.accessor("printStatus", {
      cell: (data) => handlePrintStatusKRText(data.getValue()),
      header: "출력 상태",
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
