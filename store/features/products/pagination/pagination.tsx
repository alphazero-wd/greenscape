import { useState } from "react";
import { usePagination } from "./use-pagination";

interface PaginationProps {
  totalCount: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRange = usePagination({
    currentPage,
    totalCount,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPrevious = () => {
    setCurrentPage(currentPage - 1);
  };
};
