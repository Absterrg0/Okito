import { useQueryClient } from "@tanstack/react-query";
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";



interface ApiToken {
    id: string;
    rawToken: string;
    name: string;
    environment: string;
}

interface Response{
    msg:string,
    apiToken:ApiToken
}



export const useApiTokenMutation = (projectId: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (environment: string) => {
            const response = await axios.post<Response>(`/api/projects/${projectId}/api-token`, { environment });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['project-details', projectId]})
            toast.success("Api token created successfully")
        },
        onError: () => {
            toast.error("Failed to create API token. Please try again.")
        }
    })
}