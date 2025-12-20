import { AlertCircle, Copy, Bot, Clock } from 'lucide-react';

export function Problem() {
  const problems = [
    {
      icon: Clock,
      title: "500+ Applications to Review",
      description: "Spending hours reading every submission manually is unsustainable and inefficient.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Copy,
      title: "Plagiarized Content",
      description: "Candidates copy answers from the internet or from each other, making it hard to find genuine talent.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Bot,
      title: "AI-Generated Responses",
      description: "ChatGPT-written applications make everyone sound perfect, but reveal nothing about real skills.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: AlertCircle,
      title: "Missing Top Talent",
      description: "Great candidates get lost in the noise while you waste time on low-quality submissions.",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="py-20 sm:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-100 text-red-600 rounded-full mb-6 text-sm">
            The Challenge
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-6">
            The Problem is Real
          </h2>
          <p className="text-xl text-gray-600">
            Every recruiter and educator faces the same challenges when reviewing submissions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {problems.map((problem, index) => (
            <div key={index} className="group relative bg-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className={`w-14 h-14 bg-gradient-to-br ${problem.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <problem.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg text-gray-900 mb-3">{problem.title}</h3>
              <p className="text-gray-600 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}