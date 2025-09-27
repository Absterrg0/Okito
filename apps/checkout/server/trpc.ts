import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson'
import prisma from '@/db'
import { getEventSchema } from '@/types/event'
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create({
    transformer:superjson
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;



export const sessionGuardProcedure = t.procedure
  .input(getEventSchema)
  .use(async ({ input, next }) => {
    const { sessionId } = input;

    const event = await prisma.event.findFirst({
      where: { sessionId },
      select: { occurredAt: true, sessionId: true },
    });

    console.log(sessionId);
    if (!event) {
      throw new TRPCError({ code: 'NOT_FOUND', message: 'Event not found or invalid session Id provided' });
    }

    if (event.occurredAt) {
      const now = new Date();
      const sessionTime = new Date(event.occurredAt);
      const tenMinutesAgo = new Date(now.getTime() - 15 * 60 * 1000);
      if (sessionTime < tenMinutesAgo) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            'The session ID provided has expired. Please refresh the page and try again.',
        });
      }
    }

    return next();
  });

export const protectedProcedure = sessionGuardProcedure;