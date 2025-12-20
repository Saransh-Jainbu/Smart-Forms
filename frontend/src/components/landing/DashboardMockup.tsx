export function DashboardMockup() {
  const candidates = [
    { rank: 1, name: "Sarah Chen", score: 98, plagiarism: 0, ai: 5, status: "verified", color: "from-green-500 to-emerald-500" },
    { rank: 2, name: "Marcus Johnson", score: 96, plagiarism: 2, ai: 8, status: "verified", color: "from-green-500 to-emerald-500" },
    { rank: 3, name: "Alex Rivera", score: 78, plagiarism: 12, ai: 45, status: "warning", color: "from-yellow-500 to-orange-500" },
    { rank: 4, name: "Emma Williams", score: 94, plagiarism: 3, ai: 6, status: "verified", color: "from-green-500 to-emerald-500" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white text-xl mb-1">Submission Analysis Dashboard</h3>
            <p className="text-gray-400 text-sm">500 applications analyzed in real-time</p>
          </div>
          <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg backdrop-blur-sm text-sm border border-emerald-500/30">
            Live View
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-transparent bg-clip-text mb-1">342</div>
          <div className="text-sm text-gray-600">Verified</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl bg-gradient-to-r from-amber-600 to-orange-500 text-transparent bg-clip-text mb-1">98</div>
          <div className="text-sm text-gray-600">Warning</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl bg-gradient-to-r from-red-600 to-rose-500 text-transparent bg-clip-text mb-1">60</div>
          <div className="text-sm text-gray-600">Flagged</div>
        </div>
        <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text mb-1">98.2%</div>
          <div className="text-sm text-gray-600">Accuracy</div>
        </div>
      </div>

      {/* Candidates List */}
      <div className="p-6">
        <div className="text-sm text-gray-600 mb-4">Top Ranked Candidates</div>
        <div className="space-y-3">
          {candidates.map((candidate) => (
            <div key={candidate.rank} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm bg-gradient-to-br ${
                candidate.rank === 1 ? 'from-yellow-400 to-amber-500 shadow-lg shadow-yellow-500/50' :
                candidate.rank === 2 ? 'from-slate-300 to-slate-400 shadow-lg shadow-slate-400/50' :
                candidate.rank === 3 ? 'from-orange-400 to-orange-500 shadow-lg shadow-orange-500/50' :
                'from-gray-300 to-gray-400'
              }`}>
                {candidate.rank}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-gray-900 mb-1">{candidate.name}</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full bg-gradient-to-r ${candidate.color}`}
                        style={{ width: `${candidate.score}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">{candidate.score}/100</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    candidate.plagiarism < 10 ? 'bg-emerald-100 text-emerald-700' :
                    candidate.plagiarism < 30 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {candidate.plagiarism}% plagiarism
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    candidate.ai < 20 ? 'bg-emerald-100 text-emerald-700' :
                    candidate.ai < 50 ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {candidate.ai}% AI
                  </span>
                </div>
              </div>

              {candidate.status === 'verified' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Verified
                </div>
              )}
              {candidate.status === 'warning' && (
                <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Warning
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}