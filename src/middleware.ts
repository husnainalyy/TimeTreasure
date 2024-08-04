// middleware.ts (or .js)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const isAuthenticated = !!request.cookies.get('authToken'); // Adjust based on how you manage authentication

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    if (url.pathname === '/login' && isAuthenticated) {
        // Redirect authenticated users away from the login page
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login/:path*'], // Adjust to your routes
};
