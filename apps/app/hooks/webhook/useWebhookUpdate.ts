import { trpc } from "@/lib/trpc"
import {toast} from 'sonner'




export const useWebhookUpdate = (projectId:string | undefined)=>{

    const utils = trpc.useUtils();

    return trpc.webhook.updateStatus.useMutation({
        onSuccess: (data)=>{
            if(!projectId) return;
            utils.project.details.setData({id:projectId}, (old)=>{
                if(!old) return old;

                return {
                    ...old,
                    webhookEndpoints: data.status === 'REVOKED' 
                        ? old.webhookEndpoints.filter(webhook => webhook.id !== data.id)
                        : old.webhookEndpoints.map(webhook=> webhook.id === data.id ? {
                            ...webhook,
                            status:data.status
                        } : webhook)
                }
            })
        },
        onError: (error)=>{
            toast.error(error.message)
        }
    })
}