
import { useState, useMemo } from 'react';

export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
}

export const usePagination = <T>(items: T[], pageSize: number = 50) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginationInfo = useMemo(() => {
    const totalPages = Math.ceil(items.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems = items.slice(startIndex, endIndex);

    return {
      currentItems,
      totalPages,
      currentPage,
      pageSize,
      totalItems: items.length,
      hasNext: currentPage < totalPages,
      hasPrevious: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, items.length)
    };
  }, [items, currentPage, pageSize]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, paginationInfo.totalPages)));
  };

  const nextPage = () => {
    if (paginationInfo.hasNext) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const previousPage = () => {
    if (paginationInfo.hasPrevious) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    ...paginationInfo,
    goToPage,
    nextPage,
    previousPage,
    resetPage
  };
};
