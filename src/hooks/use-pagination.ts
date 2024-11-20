import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '0', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const searchText = searchParams.get('search') || '';

    const setPage = (newPage: number) => {
        searchParams.set('page', newPage.toString());
        setSearchParams(searchParams);
    };

    const setPageSize = (newPageSize: number) => {
        searchParams.set('pageSize', newPageSize.toString());
        setSearchParams(searchParams);
    };

    const setSearchText = (newSearch: string) => {
        searchParams.set('search', newSearch);
        setSearchParams(searchParams);
    }

    useEffect(() => {
        let updated = false;
        if (!searchParams.has('page')) {
            searchParams.set('page', '0');
            updated = true;
        }
        if (!searchParams.has('pageSize')) {
            searchParams.set('pageSize', '10');
            updated = true;
        }
        if (!searchParams.has('search')) {
            searchParams.set('search', '');
            updated = true;
        }
        if (updated) {
            setSearchParams(searchParams);
        }
    }, [searchParams, setSearchParams]);

    return { page, pageSize, setPage, setPageSize, searchText, setSearchText };
};
