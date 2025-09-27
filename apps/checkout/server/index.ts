// server/_app.ts
import { router, publicProcedure } from './trpc';
import { eventsRouter } from './router/event';
import { transactionRouter } from './router/transaction';
export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  events:eventsRouter,
  transaction:transactionRouter,
});

export type AppRouter = typeof appRouter;
