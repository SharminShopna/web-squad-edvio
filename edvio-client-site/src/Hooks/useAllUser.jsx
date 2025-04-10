import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

export default function useAllUser() {
  const axiosSecure = useAxiosSecure();
  const {data: user = [], isLoading, refetch} = useQuery({
    queryKey: ["user"],
    queryFn: async ()=>{
     const {data} = await axiosSecure.get('/allUser');
     return data;
    }
  })
  return {user, isLoading, refetch};
}
