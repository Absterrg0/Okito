// server/_app.ts
import { projectRouter } from './router/project';
import { webhookRouter } from './router/webhook';
import { userRouter } from './router/user';
import { router, publicProcedure, protectedProcedure } from './trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  webhook: webhookRouter,
  project: projectRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
