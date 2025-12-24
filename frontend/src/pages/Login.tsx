import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

interface LoginProps {
    onLogin: (email: string, token: string) => void
}

export default function Login({ onLogin }: LoginProps) {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup')
    const [step, setStep] = useState(1) // 1 or 2 for signup

    // Form fields
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [organization, setOrganization] = useState('')
    const [role, setRole] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [useCase, setUseCase] = useState('')
    const [organizationSize, setOrganizationSize] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Update signup mode if URL parameter changes
        if (searchParams.get('mode') === 'signup') {
            setIsSignup(true)
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        // If signup and on step 1, go to step 2
        if (isSignup && step === 1) {
            setStep(2)
            return
        }

        setLoading(true)

        try {
            const endpoint = isSignup ? '/api/auth/register' : '/api/auth/login'
            const payload = isSignup ? {
                email,
                password,
                full_name: fullName,
                organization,
                role,
                phone_number: phoneNumber || null,
                use_case: useCase || null,
                organization_size: organizationSize || null
            } : {
                email,
                password
            }

            const response = await axios.post(`http://localhost:8000${endpoint}`, payload)

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
                // Handle both string and array formats from backend
                const detail = err.response.data.detail
                if (typeof detail === 'string') {
                    setError(detail)
                } else if (Array.isArray(detail)) {
                    // Pydantic validation errors (422) - extract the message
                    const errorMsg = detail.map((err: any) => err.msg || err.message).join(', ')
                    setError(errorMsg)
                } else {
                    setError('Authentication failed. Please try again.')
                }
            } else {
                setError('Authentication failed. Please try again.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleBack = () => {
        setStep(1)
        setError('')
    }

    const toggleMode = () => {
        setIsSignup(!isSignup)
        setStep(1)
        setError('')
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-100">
                {/* Back to Home */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-4 text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center gap-1"
                >
                    ← Back to Home
                </button>

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
                        <span className="text-3xl">🎯</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">SmartScreen AI</h1>
                    <p className="text-gray-600">Plagiarism Detection & Candidate Ranking</p>
                </div>

                {/* Progress Indicator for Signup */}
                {isSignup && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${step === 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                Step 1: Credentials
                            </span>
                            <span className={`text-sm font-medium ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                                Step 2: Profile
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                                style={{ width: `${(step / 2) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Step 1: Credentials (Login or Signup) */}
                    {(!isSignup || step === 1) && (
                        <>
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
                                {isSignup && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Min 10 chars, include uppercase, lowercase, number & special char
                                    </p>
                                )}
                            </div>

                            {isSignup && (
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium text-sm">Full Name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="John Doe"
                                        required
                                        minLength={2}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {/* Step 2: Profile Info (Signup only) */}
                    {isSignup && step === 2 && (
                        <>
                            <div>
                                <label className="block text-gray-700 mb-2 font-medium text-sm">Organization</label>
                                <input
                                    type="text"
                                    value={organization}
                                    onChange={(e) => setOrganization(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Company or University name"
                                    required
                                    minLength={2}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium text-sm">Role</label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">Select your role</option>
                                    <option value="HR Manager">HR Manager</option>
                                    <option value="Recruiter">Recruiter</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Professor">Professor</option>
                                    <option value="Student">Student</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium text-sm">
                                    Phone Number <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="+1 (555) 123-4567"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium text-sm">
                                    Use Case <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <select
                                    value={useCase}
                                    onChange={(e) => setUseCase(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select use case</option>
                                    <option value="Plagiarism Detection">Plagiarism Detection</option>
                                    <option value="Candidate Screening">Candidate Screening</option>
                                    <option value="Both">Both</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium text-sm">
                                    Organization Size <span className="text-gray-400 font-normal">(optional)</span>
                                </label>
                                <select
                                    value={organizationSize}
                                    onChange={(e) => setOrganizationSize(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                >
                                    <option value="">Select organization size</option>
                                    <option value="Solo (1)">Solo (1)</option>
                                    <option value="Small (2-10)">Small (2-10)</option>
                                    <option value="Medium (11-50)">Medium (11-50)</option>
                                    <option value="Large (51-200)">Large (51-200)</option>
                                    <option value="Enterprise (200+)">Enterprise (200+)</option>
                                </select>
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3">
                        {isSignup && step === 2 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 shadow-lg shadow-blue-500/30"
                        >
                            {loading ? 'Please wait...' : (
                                isSignup ? (step === 1 ? 'Next' : 'Create Account') : 'Sign In'
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleMode}
                        className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
                    >
                        {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
                    </button>
                </div>

                {!isSignup && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-gray-500 text-xs text-center">
                            💡 Demo Mode: Use any email/password to explore
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
