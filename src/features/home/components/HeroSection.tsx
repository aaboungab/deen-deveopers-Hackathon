import { Check, HeadphonesIcon, Lock } from 'lucide-react';

export default function HeroSection() {
  return (
    <>
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
        Swiping right,{' '}
        <span className="text-green-400">for</span>{' '}
        justice.
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mb-8">
        Connecting those who need legal support with qualified professionals. Simple, secure, and swift access to justice.
      </p>
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
    </>
  );
}
