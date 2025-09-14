// app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/index';
import { createTRPCContext } from '@/server/context';
import { NextRequest } from 'next/server';
const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,

    createContext: () => createTRPCContext(req),
  });
};

// Support both GET and POST requests
export { handler as GET, handler as POST };
