import { Menu, X, Sparkles, Shield, Clock, Zap, TrendingUp, CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { Logo } from './Logo';
import { useState } from 'react';

export function MobileHero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white lg:hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-50 rounded-full blur-3xl opacity-70"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-lg text-gray-900">SmartScreen AI</span>
          </div>
          
          <button 
            className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex flex-col p-4">
              <a href="#features" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all py-3 px-4 rounded-lg">Features</a>
              <a href="#use-cases" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all py-3 px-4 rounded-lg">Use Cases</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all py-3 px-4 rounded-lg">How It Works</a>
              <button className="mt-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 px-4 pt-8 pb-12">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs text-blue-700">AI-Powered Screening</span>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl text-gray-900 mb-4 leading-tight text-center">
          Screen 500 Applications
          <span className="block bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 text-transparent bg-clip-text mt-2">
            In 5 Minutes
          </span>
        </h1>

        {/* Description */}
        <p className="text-base text-gray-600 mb-8 text-center leading-relaxed px-2">
          AI-powered plagiarism detection and quality scoring for recruiters and educators.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 mb-10">
          <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl shadow-lg shadow-blue-500/30 active:scale-95 transition-transform">
            Start Free Trial
          </button>
          <button className="w-full px-6 py-4 bg-white text-gray-700 border border-gray-300 rounded-xl active:scale-95 transition-transform">
            Watch Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col gap-3 mb-10 px-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Clock className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">14-day free trial included</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">Cancel anytime, no hassle</span>
          </div>
        </div>

        {/* Mobile Dashboard Preview */}
        <div className="relative">
          {/* Main Card */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white text-sm mb-0.5">Dashboard</h3>
                  <p className="text-gray-400 text-xs">500 applications</p>
                </div>
                <div className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs border border-emerald-500/30 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
                  Live
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
              <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                <div className="text-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-transparent bg-clip-text mb-1">342</div>
                <div className="text-xs text-gray-600">Verified</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                <div className="text-xl bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text mb-1">98</div>
                <div className="text-xs text-gray-600">Warning</div>
              </div>
              <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                <div className="text-xl bg-gradient-to-r from-red-600 to-rose-500 text-transparent bg-clip-text mb-1">60</div>
                <div className="text-xs text-gray-600">Flagged</div>
              </div>
            </div>

            {/* Top Candidates */}
            <div className="p-4 space-y-2">
              <div className="text-xs text-gray-500 mb-3">Top Ranked</div>
              
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900">Sarah Chen</div>
                  <div className="text-xs text-gray-600">Score: 98/100</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="w-9 h-9 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900">Marcus Johnson</div>
                  <div className="text-xs text-gray-600">Score: 96/100</div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm shadow-lg">
                  3
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-900">Alex Rivera</div>
                  <div className="text-xs text-gray-600">AI: 45%</div>
                </div>
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl px-4 py-2 border border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-lg text-gray-900">10x</div>
                <div className="text-xs text-gray-500">Faster</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}