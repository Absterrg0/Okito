// server/_app.ts
import { projectRouter } from './router/project';
import { webhookRouter } from './router/webhook';
import { userRouter } from './router/user';
import { router, publicProcedure, protectedProcedure } from './trpc';
import { apiTokenRouter } from './router/apiToken';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "ok"),
  webhook: webhookRouter,
  project: projectRouter,
  user: userRouter,
  apiToken:apiTokenRouter
});

export type AppRouter = typeof appRouter;
