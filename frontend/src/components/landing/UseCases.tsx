import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { DashboardMockup } from './DashboardMockup';
import { PlagiarismMockup } from './PlagiarismMockup';

export function UseCases() {
  return (
    <div id="use-cases" className="py-16 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <div className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full mb-4 sm:mb-6 text-sm">
            Use Cases
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 sm:mb-6">
            Built for Recruiters & Educators
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Two powerful use cases, one intelligent platform.
          </p>
        </div>

        {/* Recruiter Use Case */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-16 sm:mb-32 max-w-7xl mx-auto">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl text-gray-900">For Recruiters</h3>
                <p className="text-indigo-600 text-sm sm:text-base">Job Application Screening</p>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="text-red-500 mb-2 text-sm sm:text-base">The Problem</div>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  You post a job opening and receive 500+ applications via Google Forms. Each candidate answers open-ended questions, but:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Some candidates copy answers from the internet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Others use ChatGPT to write perfect-sounding responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>You waste hours reading through every single submission</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-200">
                <div className="text-green-600 mb-2 text-sm sm:text-base">The Solution</div>
                <p className="text-gray-900 text-sm sm:text-base">
                  SmartScreen AI analyzes all 500 submissions in minutes, giving you a ranked list:
                </p>
                <div className="mt-4 space-y-2 text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Top candidates (original, high-quality answers)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span>Warning candidates (some plagiarism/AI detected)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    <span>Flagged candidates (high plagiarism, likely cheating)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-indigo-600 hover:gap-3 transition-all cursor-pointer text-sm sm:text-base">
              <span>See how it works for recruiters</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <DashboardMockup />
          </div>
        </div>

        {/* Educator Use Case */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center max-w-7xl mx-auto">
          <div className="order-2 lg:order-1 relative hidden lg:block">
            <PlagiarismMockup />
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl text-gray-900">For Educators</h3>
                <p className="text-green-600 text-sm sm:text-base">Academic Integrity Monitoring</p>
              </div>
            </div>
            
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="text-red-500 mb-2 text-sm sm:text-base">The Problem</div>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  Students submit essays or assignments through Google Forms, but maintaining academic integrity is increasingly difficult:
                </p>
                <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Students copy content from online sources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>AI tools like ChatGPT write entire assignments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>Manual checking each submission is time-consuming</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-6 border border-green-200">
                <div className="text-green-600 mb-2 text-sm sm:text-base">The Solution</div>
                <p className="text-gray-900 mb-4 text-sm sm:text-base">
                  Automatically screen every submission for academic integrity issues:
                </p>
                <div className="space-y-2 text-sm sm:text-base">
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Detect plagiarism with source attribution</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Identify AI-generated content with confidence scores</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>Focus grading time on original student work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-green-600 hover:gap-3 transition-all cursor-pointer text-sm sm:text-base">
              <span>See how it works for educators</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}