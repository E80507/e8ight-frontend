import * as React from "react";
import {
  Row,
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
import { MemberRes, UserType } from "@/app/api/dto/member";
import Pagination from "@/app/_components/pagination";
import formattedDate from "@/util/date";
import { handleCommaPoint, handleCommaPrice } from "@/util/price";
import { handleStatusKRText } from "@/util/member";
import TableSummaryText from "@/app/_components/table/table-summary-text";
import { handleMaskEmail, handleMaskName } from "@/util/string";
import MemberDetailModal from "./member-detail-modal";
import { useEffect } from "react";
interface MemberTableProps {
  data: MemberRes[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  totalDataLength: number; // 총 데이터 수
}

export function MemberTable({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  totalDataLength,
}: MemberTableProps) {
  const [selectedId, setSelectedId] = React.useState<null | string>(null); // 클릭한 회원의 ID
  const [modal, setModal] = React.useState(false); // 회원 상세 정보 모달 노출 여부
  const [isMemoTab, setMemoTab] = React.useState(false); // 메모 탭 노출 여부
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columnHelper = createColumnHelper<MemberRes>();
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
    columnHelper.accessor("userType", {
      cell: (data) => {
        const userType = data.getValue() === UserType.ARTIST ? "작가" : "일반";
        return (
          <div
            className={`mx-auto flex h-[30px] w-[53px] items-center justify-center rounded-[50px] text-white button-s ${userType === "작가" ? "bg-[#FF6668]" : "bg-[#2A67FF]"}`}
          >
            {userType}
          </div>
        );
      },
      header: "회원 유형",
    }),
    columnHelper.accessor("userNo", {
      cell: (data) => data.getValue(),
      header: "회원 ID",
    }),
    columnHelper.accessor("createdAt", {
      cell: (data) => (
        <div className="flex flex-col items-center justify-center">
          <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
          <p>{formattedDate(data.getValue())}</p>
        </div>
      ),
      header: "회원 가입일",
    }),
    columnHelper.accessor("nickname", {
      cell: (data) => {
        const nickname = data.getValue();
        return nickname ? handleMaskName(nickname) : "정보 없음";
      },
      header: "회원 닉네임",
    }),
    columnHelper.accessor("email", {
      cell: (data) => handleMaskEmail(data.getValue()),
      header: "회원 이메일",
    }),
    columnHelper.accessor("totalOrderCount", {
      cell: (data) => `${handleCommaPrice(data.getValue())}건`,
      header: "누적 주문 횟수",
    }),
    columnHelper.accessor("totalOrderAmount", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "누적 주문 포인트",
    }),
    columnHelper.accessor("recentOrderAt", {
      cell: (data) => {
        // 주문을 한 번도 하지 않은 경우
        if (!data.getValue()) return "-";
        return (
          <div className="flex flex-col items-center justify-center">
            <p>{formattedDate(data.getValue(), "INPUT_DATE")}</p>
            <p className="text-[#2A67FF]">{formattedDate(data.getValue())}</p>
          </div>
        );
      },
      header: "최근 주문일",
    }),
    columnHelper.accessor("loginCount", {
      cell: (data) => `${handleCommaPrice(data.getValue())}회`,
      header: "로그인",
    }),
    columnHelper.accessor("pointBalance", {
      cell: (data) => handleCommaPoint(data.getValue()),
      header: "보유 포인트",
    }),
    columnHelper.accessor("userStatus", {
      cell: (data) => {
        const statusKRText = handleStatusKRText(data.getValue());
        return (
          <p className={statusKRText === "-" ? "" : "text-[#E85C40]"}>
            {statusKRText}
          </p>
        );
      },
      header: "계정 상태",
    }),
    columnHelper.accessor("memo", {
      cell: (data) => {
        const memo = data.getValue();
        const onClickMemo = () => {
          setSelectedId(data.row.original.id);
          setMemoTab(true);
          setModal(true);
        };
        return (
          <button
            type="button"
            onClick={onClickMemo}
            className={`${memo ? "border-black" : "border-[#2A67FF] text-[#2A67FF]"} mx-auto flex h-[30px] w-[45px] items-center justify-center rounded-sm border button-s`}
          >
            {memo ? "보기" : "등록"}
          </button>
        );
      },
      header: "계정 메모",
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

  // 회원 클릭 핸들러
  const onClickMember = (row: Row<MemberRes>) => {
    const id = row.original.id;
    setSelectedId(id);
    setModal(true);
  };

  // 모달창 닫기 핸들러
  const onClickClose = () => {
    setSelectedId(null); // 선택된 id 배열 초기화
    setModal(false); // 모달창 노출 여부 초기화
    setMemoTab(false); // 메모 탭 노출 여부 초기화
    setCurrentPage(currentPage); // currentPage 갱신
  };

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
      {modal && selectedId && (
        <MemberDetailModal
          isMemoTab={isMemoTab}
          id={selectedId}
          onClickClose={onClickClose}
        />
      )}
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
                onClick={() => onClickMember(row)}
                key={row.id + rowIndex}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <TableCell
                    size="md"
                    className={`cursor-pointer ${cellIndex === 0 ? "border-x border-t" : "border-r border-t"} ${rowIndex === table.getRowModel().rows.length - 1 ? "border-b" : ""}`}
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
