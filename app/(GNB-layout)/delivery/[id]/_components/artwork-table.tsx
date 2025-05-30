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
import { handleCommaPrice } from "@/util/price";
import { DeliveryArtwork } from "@/app/api/dto/delivery";
import {
  handleArtworkCategoryKRText,
  handlePrintStatusKRText,
} from "@/util/string";
import ArtworkTableSummary from "./artwork-table-summary";
import Pagination from "@/app/_components/pagination";
import { usePagination } from "@/hooks/use-pagination";

interface ArtworkTableProps {
  data: DeliveryArtwork[];
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
}

export function ArtworkTable({
  data,
  selectedIds,
  setSelectedIds,
}: ArtworkTableProps) {
  const { currentPage, setCurrentPage, totalPages } = usePagination({
    data: data,
    itemsPerPage: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<DeliveryArtwork>();

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
      header: "No.",
      cell: (original) => {
        return data.length - original.row.index;
      },
    }),
    columnHelper.accessor("artworkNo", {
      cell: (data) => (
        <div className="min-w-[calc(30vw)]">{data.getValue()}</div>
      ),
      header: "작품 번호",
    }),

    columnHelper.accessor("quantity", {
      cell: (data) => handleCommaPrice(data.getValue(), "장"),
      header: "출력 수량",
    }),
    columnHelper.accessor("printCategory", {
      cell: (data) => handleArtworkCategoryKRText(data.getValue()),
      header: "굿즈 유형",
    }),
    columnHelper.accessor("printStatus", {
      cell: (data) => handlePrintStatusKRText(data.getValue()),
      header: "출력 여부",
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
        pageSize: 3,
      },
    },
  });

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <ArtworkTableSummary selectedIds={selectedIds} data={data} />
      <Table className="">
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
