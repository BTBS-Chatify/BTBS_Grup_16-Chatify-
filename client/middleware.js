import { NextResponse } from 'next/server'

import { isAuth } from './src/middleware/isAuth'

// This function can be marked `async` if using `await` inside
export function middleware(request)
{

    alert('test');

    const cookies = request.cookies.getAll();

    // if (!isAuth(cookies)) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}