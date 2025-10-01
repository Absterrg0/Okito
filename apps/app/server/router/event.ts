import { getEventDetailsSchema, getEventDetailsSchemaResponse, getEventSchema, getEventSchemaResponse } from "@/types/event";
import { protectedProcedure, router } from "../trpc";
import prisma from "@/db";
import { TRPCError } from "@trpc/server";

const getEvents = protectedProcedure
  .input(getEventSchema)
  .output(getEventSchemaResponse)
  .query(async ({ ctx, input }) => {
    const { projectId } = input;

    const events = await prisma.event.findMany({
      where: {
        projectId,
        project: {
          userId: ctx.session.user.id,
        },
      },
      select: {
        id: true,
        sessionId: true,
        type: true,
        metadata: true,
        createdAt: true,
        payment:{
          select:{
            amount:true,
            currency:true,
            status:true
          }
        }
      },
      orderBy: { createdAt: "desc" },
    });

    return events.map((event) => ({
      id: event.id,
      sessionId: event.sessionId,
      type: event.type,
      metadata: event.metadata ?? {},
      createdAt: event.createdAt,
      payment: event.payment
    }));
  });


const getEventsDetails = protectedProcedure
.input(getEventDetailsSchema)
.output(getEventDetailsSchemaResponse)
.query(async ({ctx, input}) => {

    const {id} = input;

    const eventDetails = await prisma.event.findFirst({
        where:{
            id,
            project:{
                userId:ctx.session.user.id
            }
        },
        select:{
            type:true,
            sessionId:true,
            metadata:true,
            payment:{
                select:{
                    amount:true,
                    currency:true,
                    txHash:true,
                    status:true,
                    products:{
                        select:{
                            id:true,
                            name:true,
                            price:true,
                            metadata:true
                        }
                    }
                    
                }
            },
            deliveries:{
                select:{
                    endpoint:{
                        select:{
                            url:true,

                        }
                    },
                    attemptNumber:true,
                    deliveryStatus:true,
                }
            }
        }
    })


    if(!eventDetails){
        throw new TRPCError({
            code:"NOT_FOUND",
            message:"Event not found for the user"
        })
    }

    return {
        type: eventDetails.type,
        sessionId: eventDetails.sessionId,
        metadata: eventDetails.metadata ?? {},
        payment: eventDetails.payment,
        deliveries: eventDetails.deliveries,
    }

})

export const eventRouter = router({
  getEvents,
  getEventsDetails,
});