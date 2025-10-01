import { trpc } from "@/lib/trpc";

export function useFetchEvents(projectId:string){
    return trpc.event.getEvents.useQuery({
        projectId
    },{
        staleTime:1000*60*10,
        enabled:!!projectId,
        select:(events)=>{
            return events.map((event)=>({
                id: event.id,
                sessionId: event.sessionId,
                createdAt: new Date(event.createdAt as unknown as string).toISOString(),
                type: event.type,
                metadata: event.metadata ?? {},
                payment: event.payment ? {
                    status: event.payment.status,
                    amount: event.payment.amount as unknown as bigint,
                    currency: event.payment.currency,
                } : null
            }))
        }
    })
}