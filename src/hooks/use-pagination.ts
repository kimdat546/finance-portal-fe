import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const usePagination = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || '0', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const searchText = searchParams.get('search') || '';

    const filters: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
        if (key !== 'page' && key !== 'pageSize' && key !== 'search') {
            filters[key] = value;
        }
    });

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

    const setFilter = (key: string, value: string | undefined) => {
        if (value) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key);
        }
        setSearchParams(searchParams);
    };

    const resetFilters = () => {
        const keysToRemove: string[] = [];
        searchParams.forEach((_value, key) => {
            if (key !== 'page' && key !== 'pageSize' && key !== 'search') {
                keysToRemove.push(key);
            }
        });
        keysToRemove.forEach((key) => searchParams.delete(key));
        setSearchParams(searchParams);
    };


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

    return { page, pageSize, setPage, setPageSize, searchText, setSearchText, setFilter, resetFilters, filters };
};
