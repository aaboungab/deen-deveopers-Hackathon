'use client';

import { useState, useEffect } from 'react';
import { Heart, Scale, Shield, Users, CheckCircle, Lock, Check, HeadphonesIcon, HelpCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';




export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    // Check if user is logged in
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

  // Always show the landing page content, regardless of login status
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-900 relative overflow-hidden">
      <Sidebar />
      {/* Palestinian flag overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/50 to-green-800/50 opacity-30"></div>
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="text-white text-2xl font-bold">unseen.</div>
        <div className="flex items-center space-x-4">
                            <div className="flex space-x-2">
                    {/* <div className="w-6 h-4 bg-red-600 rounded-sm"></div> */}
                    {/* <div className="w-6 h-4 bg-green-600 rounded-sm"></div> */}
                  </div>
          {/* Only show Log in if not logged in */}
          {!isLoading && !user && (
            <a href="/auth/login" className="text-white px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
              Log in
            </a>
          )}
        </div>
      </header>
      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-6 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Swiping right,{' '}
                          <span className="text-green-400">for</span>{' '}
          justice.
        </h1>
        {/* Subtext */}
        <p className="text-xl text-white/90 max-w-2xl mb-8">
          Connecting those who need legal support with qualified professionals. Simple, secure, and swift access to justice.
        </p>
        {/* Feature Icons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Lock className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Secure & Confidential</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <Check className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Verified Lawyers</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <HeadphonesIcon className="w-4 h-4 text-white" />
            <span className="text-white text-sm">24/7 Support</span>
          </div>
        </div>
        {/* Main Action Buttons */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-4xl">
          <a href="/submit-case" className="flex-1 bg-green-600 hover:bg-green-700 transition-colors p-8 rounded-lg text-left group">
            <div className="flex flex-col items-center text-center">
              <Heart className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">I Need Legal Help</h3>
              <p className="text-white/80 text-sm">Connect with qualified legal professionals for your case.</p>
            </div>
          </a>
                          <a href="/auth/signup" className="flex-1 bg-black hover:bg-gray-800 transition-colors p-8 rounded-lg text-left group">
            <div className="flex flex-col items-center text-center">
              <Scale className="w-8 h-8 text-white mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">I&apos;m a Legal Professional</h3>
              <p className="text-white/80 text-sm">Join our network and help those in need of legal assistance.</p>
            </div>
          </a>
        </div>
        {/* Central CTA */}
                        {/* <button className="bg-red-600 hover:bg-red-700 transition-colors px-8 py-4 rounded-lg flex items-center space-x-2 mb-8"> */}
          {/* <Compass className="w-5 h-5 text-white" /> */}
          {/* <span className="text-white font-semibold">Find Legal Help</span> */}
        {/* </button> */}
        {/* Bottom Info */}
        <p className="text-white/80 text-sm mb-12">
          Free to get started • No hidden fees • Professional support
        </p>
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex flex-col items-center text-center">
              <Shield className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Privacy First</h3>
              <p className="text-white/80 text-sm">Your identity and case details remain confidential until you choose to share them.</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Verified Network</h3>
              <p className="text-white/80 text-sm">All legal professionals are thoroughly vetted and verified for your safety.</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
            <div className="flex flex-col items-center text-center">
              <CheckCircle className="w-8 h-8 text-white mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Quick Matching</h3>
              <p className="text-white/80 text-sm">Our algorithm connects you with the right legal professional for your specific needs.</p>
            </div>
          </div>
        </div>
      </main>
      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors">
        <HelpCircle className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
