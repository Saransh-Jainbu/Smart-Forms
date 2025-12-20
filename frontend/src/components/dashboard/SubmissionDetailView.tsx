import { ArrowLeft, X, CheckCircle, Mail, FileText } from 'lucide-react';

interface SubmissionDetailViewProps {
  submissionId: string;
  onBack: () => void;
}

export function SubmissionDetailView({ submissionId, onBack }: SubmissionDetailViewProps) {
  const submission = {
    id: submissionId,
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    submittedAt: 'Dec 14, 2024 10:30 AM',
    overallScores: {
      plagiarism: 5,
      ai: 12,
      quality: 92,
    },
    answers: [
      {
        question: 'Why do you want this job?',
        answer:
          'I am passionate about building scalable systems and have 5 years of experience in backend development. This role aligns perfectly with my career goals of working on distributed systems and cloud infrastructure. I admire your company\'s commitment to innovation and would love to contribute to building products that serve millions of users.',
        analysis: {
          plagiarism: 3,
          plagiarismStatus: 'Original content',
          ai: 8,
          aiStatus: 'Likely human-written',
          quality: 95,
          qualityStatus: 'Well-structured, detailed',
        },
      },
      {
        question: 'Describe a challenging project you worked on',
        answer:
          'In my previous role, I led the migration of our monolithic application to microservices architecture. This involved coordinating with multiple teams, redesigning our database schema, and implementing a robust API gateway. The project took 6 months and successfully improved our deployment frequency from monthly to daily releases while reducing downtime by 80%.',
        analysis: {
          plagiarism: 7,
          plagiarismStatus: 'Minimal overlap',
          ai: 15,
          aiStatus: 'Mostly human-written',
          quality: 88,
          qualityStatus: 'Good detail, clear examples',
        },
      },
      {
        question: 'What are your key strengths as a software engineer?',
        answer:
          'My key strengths include system design, problem-solving, and team collaboration. I excel at breaking down complex problems into manageable components and designing solutions that are both scalable and maintainable. I also have strong communication skills which help me work effectively with cross-functional teams.',
        analysis: {
          plagiarism: 5,
          plagiarismStatus: 'Original content',
          ai: 14,
          aiStatus: 'Human-written with AI assistance',
          quality: 90,
          qualityStatus: 'Clear and comprehensive',
        },
      },
    ],
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score < 30) return 'bg-green-50 border-green-200';
    if (score < 70) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getStatusBadge = (score: number) => {
    if (score < 30) return { text: 'Clean', color: 'bg-green-100 text-green-700 border-green-200' };
    if (score < 70) return { text: 'Warning', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
    return { text: 'Flagged', color: 'bg-red-100 text-red-700 border-red-200' };
  };

  const qualityBadge = submission.overallScores.quality >= 80
    ? { text: 'High', color: 'bg-green-100 text-green-700 border-green-200' }
    : submission.overallScores.quality >= 60
    ? { text: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
    : { text: 'Low', color: 'bg-red-100 text-red-700 border-red-200' };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Analysis
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl text-gray-900 mb-2">
              Submission Details - {submission.name}
            </h1>
            <p className="text-gray-600">Submitted: {submission.submittedAt}</p>
          </div>
        </div>
      </div>

      {/* Overall Scores */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg text-gray-900 mb-4">Overall Scores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Plagiarism */}
          <div className={`rounded-xl border p-6 ${getScoreBg(submission.overallScores.plagiarism)}`}>
            <div className="text-sm text-gray-600 mb-2">Plagiarism Detection</div>
            <div className={`text-4xl mb-2 ${getScoreColor(submission.overallScores.plagiarism)}`}>
              {submission.overallScores.plagiarism}%
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusBadge(submission.overallScores.plagiarism).color}`}>
              {getStatusBadge(submission.overallScores.plagiarism).text}
            </span>
          </div>

          {/* AI Content */}
          <div className={`rounded-xl border p-6 ${getScoreBg(submission.overallScores.ai)}`}>
            <div className="text-sm text-gray-600 mb-2">AI Content Detection</div>
            <div className={`text-4xl mb-2 ${getScoreColor(submission.overallScores.ai)}`}>
              {submission.overallScores.ai}%
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs border ${getStatusBadge(submission.overallScores.ai).color}`}>
              {getStatusBadge(submission.overallScores.ai).text}
            </span>
          </div>

          {/* Quality */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="text-sm text-gray-600 mb-2">Quality Score</div>
            <div className="text-4xl text-blue-600 mb-2">
              {submission.overallScores.quality}%
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-xs border ${qualityBadge.color}`}>
              {qualityBadge.text}
            </span>
          </div>
        </div>
      </div>

      {/* Question Answers */}
      <div className="space-y-6">
        {submission.answers.map((item, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Question Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
              <h3 className="text-white">Question {index + 1}: {item.question}</h3>
            </div>

            {/* Answer */}
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-sm text-gray-600 mb-2">Answer:</h4>
              <p className="text-gray-900 leading-relaxed">{item.answer}</p>
            </div>

            {/* Analysis */}
            <div className="p-6 bg-gray-50">
              <h4 className="text-sm text-gray-900 mb-3">Analysis:</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plagiarism:</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getScoreColor(item.analysis.plagiarism)}`}>
                      {item.analysis.plagiarism}%
                    </span>
                    <span className="text-sm text-gray-500">({item.analysis.plagiarismStatus})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">AI Detection:</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${getScoreColor(item.analysis.ai)}`}>
                      {item.analysis.ai}%
                    </span>
                    <span className="text-sm text-gray-500">({item.analysis.aiStatus})</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quality:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-600">{item.analysis.quality}%</span>
                    <span className="text-sm text-gray-500">({item.analysis.qualityStatus})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
        <h3 className="text-gray-900 mb-4">Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-sm">
            <CheckCircle className="w-5 h-5" />
            Approve Candidate
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 transition-all shadow-sm">
            <X className="w-5 h-5" />
            Reject Candidate
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
            <Mail className="w-5 h-5" />
            Send Email
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all">
            <FileText className="w-5 h-5" />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
}
