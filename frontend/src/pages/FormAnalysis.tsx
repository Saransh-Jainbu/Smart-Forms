import { useState, useEffect } from 'react'

interface FormAnalysisProps {
    formId: string
    user: { email: string; token: string }
    onBack: () => void
}

interface Submission {
    id: string
    name: string
    email: string
    submittedAt: string
    plagiarismScore: number
    aiScore: number
    qualityScore: number
    rank: number
    status: 'clean' | 'warning' | 'flagged'
}

export default function FormAnalysis({ formId, user, onBack }: FormAnalysisProps) {
    const [submissions, setSubmissions] = useState<Submission[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
    const [sortBy, setSortBy] = useState<'rank' | 'plagiarism' | 'ai'>('rank')

    useEffect(() => {
        loadSubmissions()
    }, [formId])

    const loadSubmissions = async () => {
        // Mock data - will connect to real API
        setTimeout(() => {
            const mockData: Submission[] = [
                {
                    id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    submittedAt: '2024-12-14 10:30 AM',
                    plagiarismScore: 5,
                    aiScore: 12,
                    qualityScore: 92,
                    rank: 1,
                    status: 'clean'
                },
                {
                    id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    submittedAt: '2024-12-14 11:15 AM',
                    plagiarismScore: 78,
                    aiScore: 85,
                    qualityScore: 45,
                    rank: 2,
                    status: 'flagged'
                },
                {
                    id: '3',
                    name: 'Bob Johnson',
                    email: 'bob@example.com',
                    submittedAt: '2024-12-14 12:00 PM',
                    plagiarismScore: 35,
                    aiScore: 15,
                    qualityScore: 78,
                    rank: 3,
                    status: 'warning'
                },
                {
                    id: '4',
                    name: 'Alice Williams',
                    email: 'alice@example.com',
                    submittedAt: '2024-12-14 01:45 PM',
                    plagiarismScore: 8,
                    aiScore: 10,
                    qualityScore: 88,
                    rank: 4,
                    status: 'clean'
                },
                {
                    id: '5',
                    name: 'Charlie Brown',
                    email: 'charlie@example.com',
                    submittedAt: '2024-12-14 02:30 PM',
                    plagiarismScore: 92,
                    aiScore: 95,
                    qualityScore: 25,
                    rank: 5,
                    status: 'flagged'
                }
            ]
            setSubmissions(mockData)
            setLoading(false)
        }, 500)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'clean': return 'bg-green-500/20 text-green-300 border-green-500/30'
            case 'warning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
            case 'flagged': return 'bg-red-500/20 text-red-300 border-red-500/30'
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30'
        }
    }

    const getScoreColor = (score: number) => {
        if (score < 30) return 'text-green-400'
        if (score < 70) return 'text-yellow-400'
        return 'text-red-400'
    }

    return (
        <div className="min-h-screen p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <button
                    onClick={onBack}
                    className="mb-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all"
                >
                    ← Back to Dashboard
                </button>

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Form Analysis</h1>
                        <p className="text-purple-200">Software Engineer Applications 2024</p>
                    </div>
                    <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">
                        Export Results
                    </button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <p className="text-purple-200 text-sm mb-1">Total</p>
                    <p className="text-3xl font-bold text-white">{submissions.length}</p>
                </div>
                <div className="bg-green-500/10 backdrop-blur-lg rounded-xl p-4 border border-green-500/30">
                    <p className="text-green-200 text-sm mb-1">Clean</p>
                    <p className="text-3xl font-bold text-green-300">
                        {submissions.filter(s => s.status === 'clean').length}
                    </p>
                </div>
                <div className="bg-yellow-500/10 backdrop-blur-lg rounded-xl p-4 border border-yellow-500/30">
                    <p className="text-yellow-200 text-sm mb-1">Warning</p>
                    <p className="text-3xl font-bold text-yellow-300">
                        {submissions.filter(s => s.status === 'warning').length}
                    </p>
                </div>
                <div className="bg-red-500/10 backdrop-blur-lg rounded-xl p-4 border border-red-500/30">
                    <p className="text-red-200 text-sm mb-1">Flagged</p>
                    <p className="text-3xl font-bold text-red-300">
                        {submissions.filter(s => s.status === 'flagged').length}
                    </p>
                </div>
                <div className="bg-purple-500/10 backdrop-blur-lg rounded-xl p-4 border border-purple-500/30">
                    <p className="text-purple-200 text-sm mb-1">Avg Quality</p>
                    <p className="text-3xl font-bold text-purple-300">
                        {Math.round(submissions.reduce((acc, s) => acc + s.qualityScore, 0) / submissions.length)}%
                    </p>
                </div>
            </div>

            {/* Submissions Table */}
            <div className="max-w-7xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden">
                    <div className="p-6 border-b border-white/20">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white">Ranked Submissions</h2>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="px-4 py-2 bg-white/20 border border-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            >
                                <option value="rank">Sort by Rank</option>
                                <option value="plagiarism">Sort by Plagiarism</option>
                                <option value="ai">Sort by AI Score</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-white">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                            Analyzing submissions...
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-purple-200 font-semibold">Rank</th>
                                        <th className="px-6 py-4 text-left text-purple-200 font-semibold">Candidate</th>
                                        <th className="px-6 py-4 text-left text-purple-200 font-semibold">Submitted</th>
                                        <th className="px-6 py-4 text-center text-purple-200 font-semibold">Plagiarism</th>
                                        <th className="px-6 py-4 text-center text-purple-200 font-semibold">AI Score</th>
                                        <th className="px-6 py-4 text-center text-purple-200 font-semibold">Quality</th>
                                        <th className="px-6 py-4 text-center text-purple-200 font-semibold">Status</th>
                                        <th className="px-6 py-4 text-center text-purple-200 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map((submission, index) => (
                                        <tr
                                            key={submission.id}
                                            className="border-t border-white/10 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl">
                                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}
                                                    </span>
                                                    <span className="text-white font-bold">#{submission.rank}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="text-white font-semibold">{submission.name}</p>
                                                    <p className="text-purple-200 text-sm">{submission.email}</p>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-purple-200 text-sm">{submission.submittedAt}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`font-bold ${getScoreColor(submission.plagiarismScore)}`}>
                                                    {submission.plagiarismScore}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`font-bold ${getScoreColor(submission.aiScore)}`}>
                                                    {submission.aiScore}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="font-bold text-green-400">{submission.qualityScore}%</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(submission.status)}`}>
                                                    {submission.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button
                                                    onClick={() => setSelectedSubmission(submission)}
                                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full border border-white/20 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">{selectedSubmission.name}</h3>
                                <p className="text-purple-200">{selectedSubmission.email}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSubmission(null)}
                                className="text-white hover:text-purple-200 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-white/5 rounded-lg p-4">
                                <p className="text-purple-200 text-sm mb-1">Plagiarism</p>
                                <p className={`text-2xl font-bold ${getScoreColor(selectedSubmission.plagiarismScore)}`}>
                                    {selectedSubmission.plagiarismScore}%
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <p className="text-purple-200 text-sm mb-1">AI Generated</p>
                                <p className={`text-2xl font-bold ${getScoreColor(selectedSubmission.aiScore)}`}>
                                    {selectedSubmission.aiScore}%
                                </p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-4">
                                <p className="text-purple-200 text-sm mb-1">Quality</p>
                                <p className="text-2xl font-bold text-green-400">{selectedSubmission.qualityScore}%</p>
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 mb-6">
                            <h4 className="text-white font-semibold mb-3">Analysis Summary</h4>
                            <div className="space-y-2 text-purple-200">
                                {selectedSubmission.plagiarismScore > 70 && (
                                    <p>⚠️ High plagiarism detected - content matches other submissions</p>
                                )}
                                {selectedSubmission.aiScore > 70 && (
                                    <p>🤖 Likely AI-generated content detected</p>
                                )}
                                {selectedSubmission.qualityScore > 80 && (
                                    <p>✅ High-quality response with good structure and clarity</p>
                                )}
                                {selectedSubmission.status === 'clean' && (
                                    <p>✨ No issues detected - appears to be original work</p>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
                                Approve
                            </button>
                            <button className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors">
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
