import { CheckCircle, Shield, Users } from 'lucide-react';

export default function FeatureCards() {
  return (
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
  );
}