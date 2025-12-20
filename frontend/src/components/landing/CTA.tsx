import { ArrowRight, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

export function CTA() {
  const navigate = useNavigate();
  const benefits = [
    "Analyze unlimited submissions during trial",
    "Advanced plagiarism & AI detection",
    "Quality scoring & smart ranking",
    "Priority email support"
  ];

  return (
    <div className="py-16 sm:py-32 bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-5">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1613159902862-05c838e51e40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjb21wdXRlcnxlbnwxfHx8fDE3NjYwMzY2MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            <div className="grid md:grid-cols-5">
              {/* Left Side - CTA Content */}
              <div className="md:col-span-3 p-8 sm:p-12 lg:p-16">
                <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm">
                  Limited Time Offer
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4 sm:mb-6">
                  Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Transform</span> Your Screening Process?
                </h2>

                <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                  Join 1,200+ recruiters and educators who've already screened over 50,000 submissions with SmartScreen AI.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <button
                    onClick={() => navigate('/login?mode=signup')}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 text-sm sm:text-base"
                  >
                    Start Free Trial
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-900 rounded-xl hover:bg-gray-200 transition-colors text-sm sm:text-base">
                    Schedule Demo
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Benefits */}
              <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-8 sm:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white rounded-full blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-purple-400 rounded-full blur-3xl opacity-20"></div>

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl text-white mb-4 sm:mb-6">Free Trial Includes:</h3>
                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-white">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 mt-0.5" />
                        <span className="text-base sm:text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl sm:text-3xl text-white mb-1">$0</div>
                    <div className="text-indigo-200 text-sm sm:text-base">for your first 14 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-xs sm:text-sm">GDPR Compliant</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <div className="text-xs sm:text-sm">Bank-Level Security</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <div>
                <div className="text-xs sm:text-sm">24/7 Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}