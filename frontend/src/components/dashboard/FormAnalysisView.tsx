import { ArrowLeft, Download, Filter, TrendingUp, TrendingDown, Award, Zap } from 'lucide-react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface FormAnalysisViewProps {
  formId: string;
  onBack: () => void;
  onViewSubmission: (submissionId: string) => void;
}

export function FormAnalysisView({ formId, onBack, onViewSubmission }: FormAnalysisViewProps) {
  const formData = {
    name: 'Software Engineer Applications 2024',
    platform: 'Google Forms',
    submissions: 247,
    lastSync: '2 min ago',
    creditsUsed: 1235,
  };

  const stats = [
    { label: 'Total', value: 247, color: 'text-gray-900' },
    { label: 'Clean', value: 198, percent: '80%', color: 'text-green-600' },
    { label: 'Warning', value: 37, percent: '15%', color: 'text-yellow-600' },
    { label: 'Flagged', value: 12, percent: '5%', color: 'text-red-600' },
    { label: 'Avg Quality', value: '78%', color: 'text-blue-600' },
  ];

  const submissions = [
    {
      id: '1',
      rank: 1,
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      plagiarism: 5,
      ai: 12,
      quality: 92,
      status: 'clean',
      medal: '🥇',
      creditsUsed: 5,
    },
    {
      id: '2',
      rank: 2,
      name: 'Marcus Johnson',
      email: 'marcus@example.com',
      plagiarism: 8,
      ai: 10,
      quality: 88,
      status: 'clean',
      medal: '🥈',
      creditsUsed: 5,
    },
    {
      id: '3',
      rank: 3,
      name: 'Emily Rodriguez',
      email: 'emily@example.com',
      plagiarism: 12,
      ai: 15,
      quality: 85,
      status: 'clean',
      medal: '🥉',
      creditsUsed: 5,
    },
    {
      id: '4',
      rank: 4,
      name: 'David Kim',
      email: 'david@example.com',
      plagiarism: 6,
      ai: 8,
      quality: 84,
      status: 'clean',
      creditsUsed: 5,
    },
    {
      id: '5',
      rank: 5,
      name: 'Carol White',
      email: 'carol@example.com',
      plagiarism: 35,
      ai: 18,
      quality: 78,
      status: 'warning',
      creditsUsed: 5,
    },
    {
      id: '6',
      rank: 6,
      name: 'James Wilson',
      email: 'james@example.com',
      plagiarism: 42,
      ai: 55,
      quality: 65,
      status: 'warning',
      creditsUsed: 5,
    },
    {
      id: '7',
      rank: 7,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      plagiarism: 78,
      ai: 85,
      quality: 45,
      status: 'flagged',
      creditsUsed: 5,
    },
    {
      id: '8',
      rank: 8,
      name: 'Michael Brown',
      email: 'michael@example.com',
      plagiarism: 82,
      ai: 88,
      quality: 42,
      status: 'flagged',
      creditsUsed: 5,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'clean':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'flagged':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getRowStyle = (status: string) => {
    switch (status) {
      case 'clean':
        return 'hover:bg-green-50';
      case 'warning':
        return 'hover:bg-yellow-50';
      case 'flagged':
        return 'hover:bg-red-50';
      default:
        return 'hover:bg-gray-50';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl text-gray-900 mb-2">{formData.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                {formData.platform}
              </span>
              <span>{formData.submissions} submissions</span>
              <span>Last synced: {formData.lastSync}</span>
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200">
                <Zap className="w-3 h-3" />
                {formData.creditsUsed} credits used
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg text-gray-900 mb-4">Summary Statistics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
              <div className={`text-2xl sm:text-3xl mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              {stat.percent && (
                <div className={`text-xs mt-1 ${stat.color}`}>{stat.percent}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
              All
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm border border-gray-200 hover:bg-gray-50">
              Clean
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm border border-gray-200 hover:bg-gray-50">
              Warning
            </button>
            <button className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm border border-gray-200 hover:bg-gray-50">
              Flagged
            </button>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <option>Sort by: Rank</option>
              <option>Plagiarism</option>
              <option>AI Score</option>
              <option>Quality</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all text-sm shadow-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ranked Submissions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-900">Ranked Submissions</h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Rank</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Name</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Email</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Plagiarism</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">AI</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Quality</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Credits</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Status</th>
                <th className="px-6 py-3 text-left text-xs text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className={`transition-colors ${getRowStyle(submission.status)}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {submission.medal && <span className="text-xl">{submission.medal}</span>}
                      <span className="text-sm text-gray-900">{submission.rank}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{submission.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{submission.plagiarism}%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{submission.ai}%</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{submission.quality}%</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-xs text-amber-700">
                      <Zap className="w-3 h-3" />
                      {submission.creditsUsed}
                    </span>
                  </td>
                  <td className="px-6 py-4">{getStatusIcon(submission.status)}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewSubmission(submission.id)}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-200">
          {submissions.map((submission) => (
            <div key={submission.id} className={`p-4 transition-colors ${getRowStyle(submission.status)}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {submission.medal && <span className="text-xl">{submission.medal}</span>}
                  <span className="text-gray-900">#{submission.rank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded border border-amber-200">
                    <Zap className="w-3 h-3" />
                    {submission.creditsUsed}
                  </span>
                  {getStatusIcon(submission.status)}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-gray-900 mb-1">{submission.name}</div>
                <div className="text-sm text-gray-600">{submission.email}</div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div>
                  <div className="text-sm text-gray-600 mb-0.5">Plagiarism</div>
                  <div className="text-gray-900">{submission.plagiarism}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-0.5">AI</div>
                  <div className="text-gray-900">{submission.ai}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-0.5">Quality</div>
                  <div className="text-gray-900">{submission.quality}%</div>
                </div>
              </div>
              <button
                onClick={() => onViewSubmission(submission.id)}
                className="w-full px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}