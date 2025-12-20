import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import { Dashboard } from './components/Dashboard'

interface User {
    email: string
    token: string
}

function App() {
    const [user, setUser] = useState<User | null>(null)

    const handleLogin = (email: string, token: string) => {
        setUser({ email, token })
    }

    const handleLogout = () => {
        setUser(null)
    }

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />

                {/* Auth Routes */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
                />

                {/* Protected Routes - Use the professional Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        user ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Catch all - redirect to landing */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
