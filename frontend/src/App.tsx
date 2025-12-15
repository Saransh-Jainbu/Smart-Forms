import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FormAnalysis from './pages/FormAnalysis'

type Page = 'login' | 'dashboard' | 'analysis'

interface User {
    email: string
    token: string
}

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('login')
    const [user, setUser] = useState<User | null>(null)
    const [selectedFormId, setSelectedFormId] = useState<string | null>(null)

    const handleLogin = (email: string, token: string) => {
        setUser({ email, token })
        setCurrentPage('dashboard')
    }

    const handleLogout = () => {
        setUser(null)
        setCurrentPage('login')
    }

    const handleViewForm = (formId: string) => {
        setSelectedFormId(formId)
        setCurrentPage('analysis')
    }

    const handleBackToDashboard = () => {
        setCurrentPage('dashboard')
        setSelectedFormId(null)
    }

    return (
        <div className="min-h-screen">
            {currentPage === 'login' && (
                <Login onLogin={handleLogin} />
            )}

            {currentPage === 'dashboard' && user && (
                <Dashboard
                    user={user}
                    onLogout={handleLogout}
                    onViewForm={handleViewForm}
                />
            )}

            {currentPage === 'analysis' && user && selectedFormId && (
                <FormAnalysis
                    formId={selectedFormId}
                    user={user}
                    onBack={handleBackToDashboard}
                />
            )}
        </div>
    )
}

export default App
