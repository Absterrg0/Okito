import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Response{
    id:string,
    name:string,
}


export function useFetchProject(){
    return useQuery({
        queryKey:['projects'],
        queryFn: async () =>{
            const response = await axios.get<Response>('/api/projects')
            return response.data;
        },
        staleTime:1000*60*10
    })
}