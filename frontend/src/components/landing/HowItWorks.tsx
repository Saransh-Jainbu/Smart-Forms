import { Link2, Upload, BarChart3 } from 'lucide-react';

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Link2,
      title: "Connect Your Form",
      description: "Link your Google Form or upload submissions via CSV. Integration takes less than 2 minutes.",
      color: "indigo"
    },
    {
      number: "02",
      icon: Upload,
      title: "Auto-Analysis Starts",
      description: "Our AI instantly analyzes each submission for plagiarism, AI content, and quality scores.",
      color: "purple"
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Get Ranked Results",
      description: "View a dashboard with top candidates highlighted and suspicious submissions flagged.",
      color: "pink"
    }
  ];

  return (
    <div id="how-it-works" className="py-16 sm:py-32 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-white/10 text-indigo-300 rounded-full mb-4 sm:mb-6 backdrop-blur-sm border border-white/20 text-sm">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6">
            From 500 Submissions to Top Candidates in 3 Steps
          </h2>
          <p className="text-lg sm:text-xl text-gray-300">
            No technical expertise required. Get started in minutes.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all h-full hover:scale-105 hover:shadow-2xl">
                  <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg text-lg sm:text-2xl">
                    {step.number}
                  </div>
                  
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform border border-indigo-500/30">
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-300" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{step.description}</p>
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 z-20">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-indigo-400 transform rotate-45"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Timeline Visualization */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h3 className="text-xl sm:text-2xl text-white">Average Processing Time</h3>
              <span className="text-indigo-300 text-sm sm:text-base">For 500 submissions</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
                  <span className="text-gray-300">Manual Review</span>
                  <span className="text-red-400">~40 hours</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2 text-sm sm:text-base">
                  <span className="text-gray-300">SmartScreen AI</span>
                  <span className="text-green-400">~5 minutes</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-white/10 text-center">
              <div className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
                480x Faster
              </div>
              <p className="text-gray-400 text-sm sm:text-base">Save weeks of manual work</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-1/4 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500 rounded-full blur-3xl opacity-10"></div>
    </div>
  );
}