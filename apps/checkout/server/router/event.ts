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
        where: {
            sessionId
        },
        include:{
            payment:{
                include:{
                    products:true
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

    if(event.type!= 'PAYMENT_PENDING'){
        throw new TRPCError({
            message:"Session has expired or used already",
            code:'CONFLICT'
        })
    }

    return {
        ...event,
        token:{
            environment: event.token?.environment ?? null
        }
    } as any;
    
})


export const eventsRouter = router({
    get:getValidEvent
})