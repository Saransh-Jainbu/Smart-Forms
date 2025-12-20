import { TrendingUp, Shield, Zap } from 'lucide-react';

export function MobileDashboardPreview() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Floating Cards Stack */}
      <div className="relative">
        {/* Card 3 - Background */}
        <div className="absolute top-8 left-4 right-4 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl transform rotate-3 opacity-60 blur-sm"></div>
        
        {/* Card 2 - Middle */}
        <div className="absolute top-4 left-2 right-2 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl transform -rotate-2 opacity-80"></div>
        
        {/* Card 1 - Front (Main Card) */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-white text-sm opacity-90">Analysis Dashboard</div>
                <div className="text-white text-xl">500 Applications</div>
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-gray-50">
            <div className="text-center p-3 bg-white rounded-xl shadow-sm">
              <div className="text-2xl text-green-600 mb-1">342</div>
              <div className="text-xs text-gray-600">Verified</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl shadow-sm">
              <div className="text-2xl text-yellow-600 mb-1">98</div>
              <div className="text-xs text-gray-600">Warning</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl shadow-sm">
              <div className="text-2xl text-red-600 mb-1">60</div>
              <div className="text-xs text-gray-600">Flagged</div>
            </div>
          </div>

          {/* Top Candidates */}
          <div className="p-4 space-y-2">
            <div className="text-xs text-gray-500 mb-3">Top Candidates</div>
            
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
                1
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 truncate">Sarah Chen</div>
                <div className="text-xs text-gray-600">Quality: 98/100</div>
              </div>
              <Shield className="w-5 h-5 text-green-600" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white shadow-lg">
                2
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 truncate">Marcus Johnson</div>
                <div className="text-xs text-gray-600">Quality: 96/100</div>
              </div>
              <Shield className="w-5 h-5 text-blue-600" />
            </div>

            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg">
                3
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 truncate">Alex Rivera</div>
                <div className="text-xs text-gray-600">AI Detected: 45%</div>
              </div>
              <Zap className="w-5 h-5 text-yellow-600" />
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        </div>
      </div>
    </div>
  );
}
