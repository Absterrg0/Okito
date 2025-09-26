import { protectedProcedure, router } from "../trpc";
import {getEventSchema, getEventSchemaResponse} from '@/types/event'
import prisma from '@/db'




const getValidEvent = protectedProcedure
.input(getEventSchema)
.output(getEventSchemaResponse)
.query( async ({input})=>{

    
    const {sessionId} = input;
    
    const event = await prisma.event.findFirst({
        where: {
            sessionId
        },
        include:{
            payment:{
                include:{
                    products:true
                }
            }
        }
    })

    if (!event) {
        throw new Error('Event not found');
    }

    return event;
    
})


export const eventsRouter = router({
    get:getValidEvent
})