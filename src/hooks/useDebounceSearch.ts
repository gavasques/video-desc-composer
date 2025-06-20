
import { useState, useEffect, useMemo } from 'react';

export const useDebounceSearch = <T>(
  items: T[],
  searchTerm: string,
  searchFn: (item: T, term: string) => boolean,
  delay: number = 300
) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return items;
    }
    return items.filter(item => searchFn(item, debouncedSearchTerm.toLowerCase()));
  }, [items, debouncedSearchTerm, searchFn]);

  return {
    filteredItems,
    debouncedSearchTerm,
    isSearching: searchTerm !== debouncedSearchTerm
  };
};
