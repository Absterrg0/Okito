import { protectedProcedure, router } from "../trpc";
import {getEventSchema, getEventSchemaResponse} from '@/types/event'
import prisma from '@/db'
import { TRPCError } from "@trpc/server";




const getValidEvent = protectedProcedure
.input(getEventSchema)
.output(getEventSchemaResponse)
.query( async ({input})=>{

    
    const {sessionId} = input;
    
    const event = await prisma.event.findFirst({
        where: { sessionId },
        select:{
            id: true,
            projectId: true,
            createdAt: true,
            sessionId: true,
            type: true,
            metadata: true,
            paymentId: true,
            payment:{
                select:{
                    products:true,
                    status:true
                }
            },
            project:{
                select:{
                    name:true,
                    logoUrl:true,
                    description:true,
                    acceptedCurrencies:true
                }    
            },
            token:{
                select:{
                    environment:true
                }
            }
        }
    })
    console.log(event);

    if (!event) {
        throw new TRPCError({
            message:"Event not found",
            code:'TIMEOUT'
        })
    }

    if(event.payment?.status!= 'PENDING'){
        throw new TRPCError({
            message:"Session has expired or used already",
            code:'CONFLICT'
        })
    }

    return {
        ...event,
    };
    
})


export const eventsRouter = router({
    get:getValidEvent
})