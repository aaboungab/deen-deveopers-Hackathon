'use client';

import { useEffect, useState } from 'react';

export default function Navbar() {
 const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    if (authToken && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  return (
    <header className="relative z-10 flex justify-between items-center p-6">
      <div className="text-white text-2xl font-bold">unseen.</div>
      <div className="flex items-center space-x-4">
        {!isLoading && !user && (
          <a href="/auth/login" className="text-white px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
            Log in
          </a>
        )}
      </div>
    </header>
  );
}
