import { useState } from "react";
import { login } from "../api";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const data = await login({ email, password })
            localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.user.name)
            onLogin(data.user.name)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#18181B] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-lg p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-3.5 transition-colors duration-150">
            <h2 className="font-heading text-lg font-bold text-[#111113] dark:text-[#F2F0EB] mb-2">Login</h2>
            {error && <p className="text-[#FF3B30] text-xs sm:text-sm font-medium">{error}</p>}
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-3.5 py-2.5 text-sm text-[#111113] dark:text-[#F2F0EB] placeholder-[#8E8E93] dark:placeholder-[#71717A] bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-md focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-3.5 py-2.5 text-sm text-[#111113] dark:text-[#F2F0EB] placeholder-[#8E8E93] dark:placeholder-[#71717A] bg-[#F7F7F5] dark:bg-[#0B0B0C] border border-[#E2E2E0] dark:border-[#2A2A2D] rounded-md focus:outline-none focus:border-[#FF3B30] focus:ring-1 focus:ring-[#FF3B30]/20 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8E8E93] dark:text-[#71717A] hover:text-[#FF3B30] dark:hover:text-[#FF3B30] transition-colors cursor-pointer"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 10.875a3 3 0 01-4.243-4.243m7.5 7.5a3 3 0 00-4.243 4.243m-6.625-6.625a3 3 0 004.243 4.243M3 3l18 18" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                </button>
            </div>
            <button type="submit" disabled={loading}
                className="w-full sm:w-auto sm:self-end px-5 py-2 text-sm font-semibold text-white bg-[#FF3B30] hover:bg-[#E03227] active:bg-[#C92920] rounded-md shadow-xs transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}