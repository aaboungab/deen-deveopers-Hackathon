import {
    CheckCircle,
    Facebook,
    Instagram,
    Linkedin,
    Shield,
    Twitter
  } from "lucide-react";
  
  const Footer = () => {
    return (
      <footer className="bg-emerald-950 border-t border-emerald-800 text-white z-10">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">unseen.</h3>
              <p className="text-emerald-200 text-sm leading-relaxed">
                Connecting those who need legal support with qualified professionals. Simple, secure, and swift access
                to justice.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-emerald-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
  
            {/* Services */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Find Legal Help
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Join as Professional
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Legal Consultation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Document Review
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Case Management
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Legal Areas */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Legal Areas</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Family Law
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Criminal Defense
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Personal Injury
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Business Law
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Immigration
                  </a>
                </li>
              </ul>
            </div>
  
            {/* Support */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-emerald-200">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
  
          {/* Bottom Bar */}
          <div className="border-t border-emerald-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-emerald-300 text-sm">
                © {new Date().getFullYear()} Unseen Legal Services. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-emerald-300">
                <span className="flex items-center space-x-2">
                  <Shield className="h-4 w-4" />
                  <span>Secure & Confidential</span>
                </span>
                <span className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verified Lawyers</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;