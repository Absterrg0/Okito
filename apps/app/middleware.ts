import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_PATHS = new Set([
	"/",
	"/signin",
	"/api/auth/callback",
]);

function isPublicPath(pathname: string) {
	if (PUBLIC_PATHS.has(pathname)) return true;
	// Skip Next.js internals and static assets
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/static") ||
		pathname.startsWith("/favicon") ||
		pathname.startsWith("/assets") ||
		pathname.startsWith("/public") ||
		pathname.startsWith("/api/auth") // allow better-auth endpoints
	) {
		return true;
	}
	return false;
}

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	if (isPublicPath(pathname)) {
		return NextResponse.next();
	}

	const sessionCookie = getSessionCookie(request);
	if (!sessionCookie) {
		const signinUrl = new URL("/signin", request.url);
		return NextResponse.redirect(signinUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/:path*"],
};