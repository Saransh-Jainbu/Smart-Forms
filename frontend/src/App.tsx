import { useState } from 'react'
import './App.css'

function App() {
    const [status, setStatus] = useState<string>('Checking...')

    // Check API health on mount
    useState(() => {
        fetch('http://localhost:8000/health')
            .then(res => res.json())
            .then(data => setStatus(data.status))
            .catch(() => setStatus('API Offline'))
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="container mx-auto px-4 py-16">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-6xl font-bold text-white mb-4">
                        SmartScreen AI
                    </h1>
                    <p className="text-xl text-purple-200">
                        Production-Grade DevOps Microservices Architecture
                    </p>
                    <div className="mt-4">
                        <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm">
                            API Status: {status}
                        </span>
                    </div>
                </header>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <FeatureCard
                        title="🐍 API Gateway"
                        description="FastAPI with JWT auth, rate limiting, and service routing"
                        tech="Python"
                        status="✅ Running"
                    />
                    <FeatureCard
                        title="🐹 Forms Service"
                        description="Google/Microsoft Forms integration with OAuth"
                        tech="Go"
                        status="✅ Running"
                    />
                    <FeatureCard
                        title="🦀 Plagiarism Engine"
                        description="High-performance TF-IDF similarity detection"
                        tech="Rust"
                        status="✅ Running"
                    />
                </div>

                {/* Architecture */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-16">
                    <h2 className="text-3xl font-bold text-white mb-6">Architecture</h2>
                    <div className="grid md:grid-cols-2 gap-6 text-white">
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-300">Microservices</h3>
                            <ul className="space-y-2">
                                <li>• API Gateway (FastAPI)</li>
                                <li>• Forms Service (Go)</li>
                                <li>• Plagiarism Service (Rust)</li>
                                <li>• AI Detection (Python)</li>
                                <li>• Ranking Service (FastAPI)</li>
                                <li>• Notification Service (Node.js)</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-300">Infrastructure</h3>
                            <ul className="space-y-2">
                                <li>• Docker + Kubernetes</li>
                                <li>• PostgreSQL + Redis + RabbitMQ</li>
                                <li>• Prometheus + Grafana</li>
                                <li>• ELK Stack (Logging)</li>
                                <li>• GitHub Actions (CI/CD)</li>
                                <li>• Terraform (IaC)</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div className="grid md:grid-cols-4 gap-4">
                    <QuickLink href="http://localhost:8000/docs" label="API Docs" />
                    <QuickLink href="http://localhost:15672" label="RabbitMQ" />
                    <QuickLink href="http://localhost:9001" label="MinIO" />
                    <QuickLink href="http://localhost:3001" label="Grafana" />
                </div>

                {/* Footer */}
                <footer className="mt-16 text-center text-purple-200">
                    <p>Built with ❤️ using modern DevOps practices</p>
                    <p className="mt-2 text-sm">
                        Python • Go • Rust • Node.js • React • Docker • Kubernetes
                    </p>
                </footer>
            </div>
        </div>
    )
}

interface FeatureCardProps {
    title: string
    description: string
    tech: string
    status: string
}

function FeatureCard({ title, description, tech, status }: FeatureCardProps) {
    return (
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
            <p className="text-purple-200 mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <span className="text-sm text-purple-300">{tech}</span>
                <span className="text-sm text-green-400">{status}</span>
            </div>
        </div>
    )
}

interface QuickLinkProps {
    href: string
    label: string
}

function QuickLink({ href, label }: QuickLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg transition-colors duration-200"
        >
            {label} →
        </a>
    )
}

export default App
