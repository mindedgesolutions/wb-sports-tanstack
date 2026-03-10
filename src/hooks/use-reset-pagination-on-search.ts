import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useResetPaginationOnSearch = (search?: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (search && searchParams.get('page') !== '1') {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('page', '1');
        return params;
      });
    }
  }, [search, searchParams, setSearchParams]);
};
