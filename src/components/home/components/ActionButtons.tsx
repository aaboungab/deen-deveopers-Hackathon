import { Heart, Scale } from 'lucide-react';

export default function ActionButtons() {
  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-8 w-full max-w-4xl">
        <a href="https://www.unseenbyamal.com/auth/signup/client" className="flex-1 bg-green-600 hover:bg-green-700 transition-colors p-8 rounded-lg text-left group">
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
      <p className="text-white/80 text-sm mb-12">
        Free to get started • No hidden fees • Professional support
      </p>
    </>
  );
}