import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: Dispatch<SetStateAction<number>>;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxPagesToShow = isMobile ? 5 : 10;

  const startPage =
    Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={() => onPageChange(i)}
          className={`h-6 min-w-[30px] text-center text-black pretendard-title-s ${currentPage === i ? "underline" : "text-label-alternative"}`}
        >
          {i}
        </button>,
      );
    }
    return pages;
  };

  const goToFirstPage = () => onPageChange(1);
  const goToLastPage = () => onPageChange(totalPages);
  const goToPreviousPageSet = () => onPageChange(startPage - maxPagesToShow);
  const goToNextPageSet = () => onPageChange(startPage + maxPagesToShow);

  return (
    <div className={`${className} flex w-full justify-center`}>
      <div className="flex w-full max-w-max gap-2 rounded-md text-gray-700">
        {currentPage > 1 && startPage > maxPagesToShow && (
          <>
            <button type="button" onClick={goToFirstPage}>
              <ChevronsLeftIcon className="h-6 w-7" />
            </button>
            <button type="button" onClick={goToPreviousPageSet}>
              <ChevronLeft className="size-6" />
            </button>
          </>
        )}

        <p className="flex items-center">{renderPageNumbers()}</p>

        {endPage < totalPages && (
          <>
            <button type="button" onClick={goToNextPageSet}>
              <ChevronRight className="h-6 w-7" />
            </button>
            {endPage < totalPages && (
              <button type="button" onClick={goToLastPage}>
                <ChevronsRightIcon className="size-6" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Pagination;
