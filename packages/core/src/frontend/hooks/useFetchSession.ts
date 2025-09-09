import { useQuery } from "@tanstack/react-query"
import axios from "axios"




export const  useFetchSession = async (sessionId:string)=>{

    return useQuery({
        queryKey:['session',sessionId],
        queryFn: async ()=>{
            const response = await axios.get(`http://localhost:3000/api/v1/session/${sessionId}`)
            return response.data
        },
        enabled: !!sessionId
    })
}