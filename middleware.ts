import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match all pathnames except for
    // - API routes
    // - files (indicated by a file extension)
    // - Next.js internals
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};