
import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function createTRPCContext( req:NextRequest ) {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  return { session };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;




export type ProtectedContext = {
    session: NonNullable<Context['session']>
}