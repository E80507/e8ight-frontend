import Pagination from "@/app/_components/pagination";
import { AdminTable } from "./admin-table";
import TableSummaryBox from "./table-summary-box";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AdminRes, AdminCategory } from "@/app/api/dto/admin";
import { Post, PostCategory } from "@/api/dto/post";

const adminToPostCategory = (category: AdminCategory): PostCategory => {
  switch (category) {
    case AdminCategory.LIBRARY:
      return "LIBRARY";
    case AdminCategory.INSIGHT:
      return "INSIGHT";
    case AdminCategory.DX:
      return "DX";
    case AdminCategory.DOWNLOADS:
      return "DOWNLOADS";
  }
};

const mapAdminResToPost = (adminRes: AdminRes): Post => ({
  id: adminRes.techBlogId,
  createdAt: adminRes.createdAt,
  title: adminRes.title,
  category: adminToPostCategory(adminRes.category),
  author: adminRes.writer,
  updatedAt: adminRes.createdAt,
  deletedAt: null,
  content: "",
  thumbnail: "",
  mainImage: "",
  tags: [],
  keywords: [],
  linkUrl: "",
  fileIds: null,
});

interface TableContainerProps {
  totalData: AdminRes[];
  currentData: AdminRes[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  selectedIds: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
}

const TableContainer = ({
  totalData,
  currentData,
  currentPage,
  setCurrentPage,
  totalPages,
  selectedIds,
  setSelectedIds,
}: TableContainerProps) => {
  const prev = useSearchParams().get("prev");

  useEffect(() => {
    if (prev) {
      setCurrentPage(Number(prev));
    }
  }, [prev, setCurrentPage]);

  const mappedCurrentData = currentData.map(mapAdminResToPost);

  return (
    <div className="flex flex-col gap-[15px] overflow-x-auto">
      <TableSummaryBox
        currentDataLen={currentData.length}
        totalData={totalData}
      />

      <AdminTable
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        data={mappedCurrentData}
        totalCount={totalData.length}
      />

      {totalData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default TableContainer;
