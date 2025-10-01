import { trpc } from "@/lib/trpc"



export function useGetEventDetails(eventId: string) {
    return trpc.event.getEventsDetails.useQuery({ id: eventId }, {
        staleTime: 1000 * 60 * 10,
        enabled: !!eventId,
    })
}