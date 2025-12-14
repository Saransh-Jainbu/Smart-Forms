import { useState, useEffect } from 'react'
import axios from 'axios'

interface DashboardProps {
    user: { email: string; token: string }
    onLogout: () => void
    onViewForm: (formId: string) => void
}

interface Form {
    id: string
    title: string
    platform: string
    submissions: number
    lastSync: string
}

export default function Dashboard({ user, onLogout, onViewForm }: DashboardProps) {
    const [forms, setForms] = useState<Form[]>([])
    const [loading, setLoading] = useState(true)
    const [showConnectModal, setShowConnectModal] = useState(false)

    useEffect(() => {
        loadForms()
    }, [])

    const loadForms = async () => {
        try {
            // Mock data for now - will connect to real API
            setTimeout(() => {
                setForms([
                    {
                        id: '1',
                        title: 'Software Engineer Applications 2024',
                        platform: 'Google Forms',
                        submissions: 247,
                        lastSync: '2 minutes ago'
                    },
                    {
                        id: '2',
                        title: 'Marketing Intern Screening',
                        platform: 'Google Forms',
                        submissions: 89,
                        lastSync: '1 hour ago'
                    }
                ])
                setLoading(false)
            }, 500)
        } catch (error) {
            console.error('Failed to load forms:', error)
            setLoading(false)
        }
    }

    const handleConnectGoogle = () => {
        // Will implement Google OAuth
        alert('Google Forms integration coming soon!')
        setShowConnectModal(false)
    }

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                        <p className="text-gray-600">Welcome back, {user.email}</p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-xl border border-gray-200 transition-all shadow-sm font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Forms" value="2" icon="📋" />
                <StatCard title="Submissions" value="336" icon="📝" />
                <StatCard title="Flagged" value="12" icon="🚩" />
                <StatCard title="Analyzed" value="324" icon="✅" />
            </div>

            {/* Forms List */}
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">Connected Forms</h2>
                    <button
                        onClick={() => setShowConnectModal(true)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                    >
                        + Connect Form
                    </button>
                </div>

                {loading ? (
                    <div className="text-center text-white py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        Loading forms...
                    </div>
                ) : forms.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 text-center border border-white/20">
                        <p className="text-white text-lg mb-4">No forms connected yet</p>
                        <button
                            onClick={() => setShowConnectModal(true)}
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                            Connect Your First Form
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {forms.map((form) => (
                            <FormCard key={form.id} form={form} onView={() => onViewForm(form.id)} />
                        ))}
                    </div>
                )}
            </div>

            {/* Connect Modal */}
            {showConnectModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-6">Connect a Form</h3>

                        <div className="space-y-4">
                            <button
                                onClick={handleConnectGoogle}
                                className="w-full p-4 bg-white/20 hover:bg-white/30 rounded-lg border border-white/30 text-white font-semibold transition-all flex items-center justify-center gap-3"
                            >
                                <span className="text-2xl">📊</span>
                                Connect Google Forms
                            </button>

                            <button
                                className="w-full p-4 bg-white/10 rounded-lg border border-white/20 text-purple-300 font-semibold cursor-not-allowed"
                                disabled
                            >
                                <span className="text-2xl">📋</span>
                                Microsoft Forms (Coming Soon)
                            </button>
                        </div>

                        <button
                            onClick={() => setShowConnectModal(false)}
                            className="mt-6 w-full py-3 text-purple-200 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: string }) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{icon}</span>
                <span className="text-3xl font-bold text-white">{value}</span>
            </div>
            <p className="text-purple-200">{title}</p>
        </div>
    )
}

function FormCard({ form, onView }: { form: Form; onView: () => void }) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{form.title}</h3>
                    <p className="text-purple-200 text-sm">{form.platform}</p>
                </div>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                    Active
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-purple-200 text-sm">Submissions</p>
                    <p className="text-white font-bold text-lg">{form.submissions}</p>
                </div>
                <div>
                    <p className="text-purple-200 text-sm">Last Sync</p>
                    <p className="text-white font-bold text-lg">{form.lastSync}</p>
                </div>
            </div>

            <button
                onClick={onView}
                className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
            >
                View Analysis →
            </button>
        </div>
    )
}
