'use client';

import { useState, useEffect } from 'react';
import { User, Home, Plus, MessageCircle, Scale, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const authToken = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (authToken && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    setUser(null);
    router.push('/');
  };

  const navItems = user ? [
    { icon: Home, href: '/', label: 'Home' },
    { icon: Plus, href: '/submit-case', label: 'Submit Case' },
    { icon: Scale, href: '/cases', label: 'Review Cases' },
    { icon: MessageCircle, href: '/my-cases', label: 'My Cases' },
  ] : [
    { icon: Home, href: '/', label: 'Home' },
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      <div className="bg-gray-800 rounded-full p-2 flex flex-col space-y-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                isActive 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
              title={item.label}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
        
        {/* Logout button - only show when logged in */}
        {user && (
          <button
            onClick={handleLogout}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 text-red-300 hover:text-white hover:bg-red-600"
            title="Logout"
          >
            <LogOut className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
} 