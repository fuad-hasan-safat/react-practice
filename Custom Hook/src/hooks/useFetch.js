import { useEffect, useState } from "react";

function useFetch(fetchFunction) {

    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState();

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true);
            try {
                const places = await fetchFunction();
                setFetchedData(places);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch user places.' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFunction]);

    return {
        isFetching,
        error,
        fetchedData
    };
}

export default useFetch;