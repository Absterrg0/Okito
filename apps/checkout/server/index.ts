// server/_app.ts
import { router, publicProcedure } from './trpc';
import { eventsRouter } from './router/event';
export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  events:eventsRouter
});

export type AppRouter = typeof appRouter;
