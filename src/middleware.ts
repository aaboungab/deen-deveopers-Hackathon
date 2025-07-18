import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Minimal middleware that doesn't interfere with authentication
export function middleware(request: NextRequest) {
  // Simply pass through all requests without authentication checks
  return NextResponse.next();
}

// No matcher config - middleware won't run on any routes 