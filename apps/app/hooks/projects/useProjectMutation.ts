import {  useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import {toast} from 'sonner';


interface Response{
    msg:string,
    project:{
        name:string,
        id:string
    },

}

export function useCreateProjectMutation() {
    const queryClient = useQueryClient();
  
    return useMutation({
        mutationFn: async (projectName:string) => {
            const response = await axios.post<Response>('/api/projects/create', { projectName })
          return response.data
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey:['projects']})
          queryClient.invalidateQueries({queryKey:['apiTokens']})
        },
        onError: () => {
          toast.error("Failed to create project. Please try again.")
        }
      })
  }