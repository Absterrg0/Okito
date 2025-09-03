import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import axios from "axios"


interface WebhookResponse{
    url:string,
    secret:string,
    description:string | null
}


interface Response{
    msg:string,
    webhook:WebhookResponse
}




export const useWebhookMutation = (projectId:string | undefined) =>{
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: async ({url,description}:{url:string,description:string}) =>{
            const response = await axios.post<Response>(`/api/projects/${projectId}/webhook`, { url, description })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['project-details', projectId]})
            toast.success("Webhook created successfully")
        },
        onError: () => {
            toast.error("Failed to create webhook. Please try again.")
        }
    })
}