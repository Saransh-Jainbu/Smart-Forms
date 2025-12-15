import { useState } from 'react'
import axios from 'axios'

interface LoginProps {
    onLogin: (email: string, token: string) => void
}

export default function Login({ onLogin }: LoginProps) {
    const [isSignup, setIsSignup] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login'
            const response = await axios.post(`http://localhost:8000${endpoint}`, {
                email,
                password
            })

            // Both register and login now return access_token
            if (response.data.access_token) {
                onLogin(email, response.data.access_token)
            } else {
                setError('Authentication successful but no token received')
            }
        } catch (err: any) {
            if (err.response?.status === 429) {
                setError('Too many attempts. Please wait a minute and try again.')
            } else if (err.response?.data?.detail) {
                setError(err.response.data.detail)
            } else {
                setError('Authentication failed. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                        <span className="text-3xl">🎯</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartScreen AI</h1>
                    <p className="text-gray-600">Plagiarism Detection & Candidate Ranking</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-medium text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-blue-500/30"
                    >
                        {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSignup(!isSignup)}
                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-gray-500 text-xs text-center">
                        💡 Demo Mode: Use any email/password to explore
                    </p>
                </div>
            </div>
        </div>
    )
}
