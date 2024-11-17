import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';


export default async function middleware (req){
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    const isOnProtectedRoute = req.nextUrl.pathname.startsWith('/log');

    if(!token && isOnProtectedRoute ){
        console.log('Unauthorized: session token not valid')
        return NextResponse.redirect(new URL('/'), req.url);
    }  
    console.log('Session token validated >>', token.name);
    return NextResponse.next()
}
 
//export default NextAuth(authConfig).auth;

export const config = {
  matcher: '/log/:path*',
}