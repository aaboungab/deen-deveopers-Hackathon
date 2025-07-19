import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

import {
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users
} from "lucide-react"

const ContactUs = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-800 to-emerald-900 text-white">
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
              Have questions about our legal services? We're here to help you navigate your legal needs with confidence.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <Card className="bg-white/10 backdrop-blur-sm border-emerald-600/30">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6 text-white">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2 text-emerald-100">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        className="bg-white/20 border-emerald-600/30 text-white placeholder:text-emerald-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2 text-emerald-100">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        className="bg-white/20 border-emerald-600/30 text-white placeholder:text-emerald-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-emerald-100">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-white/20 border-emerald-600/30 text-white placeholder:text-emerald-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-emerald-100">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/20 border-emerald-600/30 text-white placeholder:text-emerald-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2 text-emerald-100">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      className="bg-white/20 border-emerald-600/30 text-white placeholder:text-emerald-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-emerald-100">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your legal needs..."
                      rows={4}
                      className="bg-white/20 border-emerald-600/30 text-white placeholder:text-emerald-200 resize-none"
                    />
                  </div>

                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-600 p-3 rounded-lg">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-emerald-100">support@unseen.legal</p>
                      <p className="text-emerald-100">hello@unseen.legal</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-600 p-3 rounded-lg">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-emerald-100">+1 (555) 123-4567</p>
                      <p className="text-emerald-100 text-sm">24/7 Support Available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-600 p-3 rounded-lg">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Address</h4>
                      <p className="text-emerald-100">123 Legal Street</p>
                      <p className="text-emerald-100">Justice City, JC 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-emerald-600 p-3 rounded-lg">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Business Hours</h4>
                      <p className="text-emerald-100">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-emerald-100">Emergency support: 24/7</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-emerald-600/30">
                <h4 className="font-semibold text-lg mb-4">Why Choose Unseen?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-100">100% Confidential & Secure</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-100">Verified Legal Professionals</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-emerald-400" />
                    <span className="text-emerald-100">Quick Response Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;