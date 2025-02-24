import { fetchData } from "../Utils/utils";
import { useQuery } from '@tanstack/react-query'

export function useEldenRingData(formType: string) {
  return useQuery({
    queryKey: ['eldenring-data', formType], // Unique key for caching
    queryFn: () =>
      fetchData(
        `https://eldenring.fanapis.com/api/${formType}?limit=50`
      ),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  })
}

// const useFetchData = (url: string) => {
//     const [data, setData] = useState<any>([]);
//     const [error, setError] = useState<Error | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [pagerData, setPagerData] = useState<number[]>([]);

//       const setDataAfterFetch = async () => {
//         const data = await fetchData(
//           `https://eldenring.fanapis.com/api/${formType}?limit=50`
//         )
//         let num = Math.ceil(data.total / data.count)
//         setData(data.data)
//         const pagers = Array.from({ length: num }, (_, i) => i + 1)
//         setPagerData(pagers)
//       }

//     useEffect(() => {
//         setDataAfterFetch()
//     }, [url]);

//     return { data, error, loading, pagerData };
// }