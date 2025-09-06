import { trpc } from "@/lib/trpc"

export const useWebhookSecretFetch = (id:string | undefined)=>{
    return trpc.webhook.getSecret.useQuery(
        { id: id! },
        {
          staleTime:1000*60,
          enabled: !!id, // Only run query when id exists
        }
      );
}