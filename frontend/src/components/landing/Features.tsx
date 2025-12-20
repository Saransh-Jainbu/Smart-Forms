import { Shield, Cpu, TrendingUp, Zap } from 'lucide-react';
import { AnalysisMockup } from './AnalysisMockup';

export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Plagiarism Detection",
      description: "Instantly identify copied content from the internet or other submissions. Get detailed similarity reports with source tracking.",
      stats: "99.2% detection rate",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Cpu,
      title: "AI Content Detection",
      description: "Detect if submissions were written by ChatGPT or other AI tools with industry-leading accuracy.",
      stats: "95%+ accuracy",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Quality Scoring",
      description: "Automatically rank candidates based on answer quality, relevance, and originality using advanced NLP.",
      stats: "Smart ranking algorithm",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Zap,
      title: "Automated Screening",
      description: "Flag suspicious submissions automatically and focus your time on top candidates only. Save 90% of review time.",
      stats: "10x faster screening",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div id="features" className="py-16 sm:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 rounded-full mb-4 sm:mb-6 text-sm">
            Platform Features
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 sm:mb-6">
            Powerful Features Built for Scale
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Everything you need to screen hundreds of submissions in minutes, not hours.
          </p>
        </div>

        {/* Feature Grid with Mockup */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-12 sm:mb-20 max-w-7xl mx-auto">
          {/* Feature Cards */}
          <div className="space-y-4 sm:space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white p-4 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-indigo-200">
                <div className="flex gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl text-gray-900">{feature.title}</h3>
                      <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full self-start sm:self-auto">{feature.stats}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analysis Mockup - Hidden on mobile */}
          <div className="relative hidden lg:block">
            <AnalysisMockup />
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-200 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-200 rounded-full blur-2xl opacity-50 -z-10"></div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto pt-12 sm:pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-indigo-600 mb-2">50K+</div>
            <div className="text-gray-600 text-sm sm:text-base">Submissions Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-indigo-600 mb-2">98.5%</div>
            <div className="text-gray-600 text-sm sm:text-base">Detection Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-indigo-600 mb-2">10x</div>
            <div className="text-gray-600 text-sm sm:text-base">Faster Screening</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl text-indigo-600 mb-2">1,200+</div>
            <div className="text-gray-600 text-sm sm:text-base">Active Users</div>
          </div>
        </div>
      </div>
    </div>
  );
}