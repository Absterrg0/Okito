import { initTRPC, TRPCError } from '@trpc/server';
import type { Context } from './context';
/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<Context>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;


const isAuthenticated = t.middleware(({ctx,next})=>{
    if(!ctx.session?.user){
        throw new TRPCError({
            code:'UNAUTHORIZED',
            message:'You must be logged in to access this resource'
        })
    }
    return next({
        ctx:{
            session: ctx.session as NonNullable<typeof ctx.session>
        }
    })
})


export const protectedProcedure = t.procedure.use(isAuthenticated);