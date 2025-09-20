import { trpc } from "@/lib/trpc"

export const useWebhookSecretFetch = (id:string | undefined, enabled: boolean = false)=>{
    return trpc.webhook.getSecret.useQuery(
        { id: id! },
        {
          staleTime:1000*60,
          enabled: !!id && enabled, // Only run query when id exists and popover is open
        }
      );
}