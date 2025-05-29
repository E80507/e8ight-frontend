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
import { DELIVERY_PAGE } from "@/constants/path";
import formattedDate from "@/util/date";
import { DeliveryRes, PrintStatus } from "@/app/api/dto/delivery";
import {
  handleDeliveryStatusKRText,
  handleMaskEmail,
  handleMaskName,
  handleMaskPhone,
  handlePrintStatusKRText,
} from "@/util/string";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import { DeliveryStatus } from "@/app/api/dto/member";
import { useEffect } from "react";
interface DeliveryTableProps {
  data: DeliveryRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  selectedIds: string[];
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  totalDataLength: number;
}

export function DeliveryTable({
  data,
  currentPage,
  setCurrentPage,
  selectedIds,
  setSelectedIds,
  totalDataLength,
}: DeliveryTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<DeliveryRes>();

  // 단일 체크박스 핸들러
  const handleCheckboxChange = (rowId: string) => {
    setSelectedIds((prevSelected) =>
      prevSelected.includes(rowId)
        ? prevSelected.filter((id) => id !== rowId)
        : [...prevSelected, rowId],
    );
  };

  // 전체 선택 핸들러
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

  // 전체 선택 여부
  const areAllPageItemsSelected = () => {
    if (data.length === 0) return false;
    const currentPageIds = data.map((item) => item.id);
    return currentPageIds.every((id) => selectedIds.includes(id));
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
          totalDataLength -
          (currentPage - 1) * itemsPerPage -
          filedData.row.index
        );
      },
    }),
    columnHelper.accessor("deliveryNo", {
      cell: (data) => data.getValue(),
      header: "배송 번호",
    }),
    columnHelper.accessor("deliveryRequestedAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p className="text-[#4C7FFF]">{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "배송 신청일",
    }),
    columnHelper.accessor("email", {
      cell: (data) =>
        data.getValue() ? handleMaskEmail(data.getValue()) : "-",
      header: "주문자 이메일",
    }),
    columnHelper.accessor("deliveryPrice", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "배송비 결제 금액",
    }),
    columnHelper.accessor("quantity", {
      cell: (data) => handleCommaPrice(data.getValue(), "장"),
      header: "배송 수량",
    }),
    columnHelper.accessor("totalPrice", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "배송 상품 총액",
    }),
    columnHelper.accessor("ordererName", {
      cell: (data) => handleMaskName(data.getValue(), true),
      header: "주문자",
    }),
    columnHelper.accessor("ordererPhone", {
      cell: (data) => handleMaskPhone(data.getValue()),
      header: "주문자 전화번호",
    }),
    columnHelper.accessor("recipientName", {
      cell: (data) => handleMaskName(data.getValue(), true),
      header: "수령자",
    }),
    columnHelper.accessor("recipientPhone", {
      cell: (data) => handleMaskPhone(data.getValue()),
      header: "수령자 전화번호",
    }),
    columnHelper.accessor("printStatus", {
      cell: (data) => {
        const isNeedConfirm = data.getValue() === PrintStatus.CONFIRM_REQUIRED;
        const printStatusText =
          handlePrintStatusKRText(data.getValue()) +
          (isNeedConfirm
            ? `(${data.row.original.printedCount}/${data.row.original.totalCount})`
            : "");
        return printStatusText;
      },
      header: "출력 상태",
    }),
    columnHelper.accessor("deliveryStatus", {
      cell: (data) => {
        const status = data.getValue();
        let statusClass = "";

        // 배송 상태에 따른 색상 클래스 지정
        switch (status) {
          case DeliveryStatus.WAITING:
            statusClass = "text-gray-500"; // 대기 상태
            break;
          case DeliveryStatus.COMPLETED:
            statusClass = "text-blue-500"; // 배송중 상태
            break;
          case DeliveryStatus.CANCELLED:
            statusClass = "text-red-500"; // 취소 상태
            break;
          case DeliveryStatus.CONFIRMED:
            statusClass = "text-green-500"; // 수령 확정 상태
            break;

          default:
            statusClass = "text-blue-500"; // 기본 상태
        }

        return (
          <div className={statusClass}>
            {handleDeliveryStatusKRText(status)}
          </div>
        );
      },
      header: "출고 상태",
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
                      href={`${DELIVERY_PAGE}/${row.original.id}?prev=${currentPage}`}
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
