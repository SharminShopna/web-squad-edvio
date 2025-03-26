import { useQuery } from "@tanstack/react-query";
import UseAuth from "@/Hook/UseAuth";
import useAxiosSecure from "./useAxiosSecure";




export default function useOneUser() {
  const axiosSecure = useAxiosSecure();
   const {user} = UseAuth();
  const {data : userData = [],isLoading,refetch} = useQuery({
    queryKey : ['user',user?.email],
    queryFn : async ()=>{
    const {data} = await axiosSecure.get(`/user/byEmail/${user?.email}`);
    return data.data;
    }
  })
  return {userData,isLoading,refetch}
    
  
}