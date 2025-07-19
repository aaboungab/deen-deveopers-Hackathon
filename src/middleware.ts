import { NextResponse } from 'next/server';

// Minimal middleware that doesn't interfere with authentication
export function middleware() {
  // Simply pass through all requests without authentication checks
  return NextResponse.next();
}

// No matcher config - middleware won't run on any routes 