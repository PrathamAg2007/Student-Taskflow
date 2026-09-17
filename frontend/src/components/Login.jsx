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
        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#292524] border border-[#E5E1D8] dark:border-[#3D3835] rounded-xl p-4 sm:p-5 mb-6 shadow-xs flex flex-col gap-3.5 transition-colors duration-150">
            <h2 className="font-heading text-lg font-bold text-[#1F2937] dark:text-[#F5F5F4] mb-2">Login</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-3.5 py-2.5 text-sm text-[#1F2937] dark:text-[#F5F5F4] placeholder-[#9CA3AF] dark:placeholder-[#78716C] bg-[#FAF7F2]/50 dark:bg-[#1C1917]/50 border border-[#E5E1D8] dark:border-[#3D3835] rounded-lg focus:outline-none focus:border-[#B5541E] focus:ring-1 focus:ring-[#B5541E]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full px-3.5 py-2.5 text-sm text-[#1F2937] dark:text-[#F5F5F4] placeholder-[#9CA3AF] dark:placeholder-[#78716C] bg-[#FAF7F2]/50 dark:bg-[#1C1917]/50 border border-[#E5E1D8] dark:border-[#3D3835] rounded-lg focus:outline-none focus:border-[#B5541E] focus:ring-1 focus:ring-[#B5541E]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] dark:text-[#78716C] hover:text-[#B5541E] transition-colors"
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
                className="w-full sm:w-auto sm:self-end px-5 py-2 text-sm font-medium text-white bg-[#1F2937] dark:bg-[#E7E5E4] dark:text-[#1C1917] hover:bg-[#B5541E] dark:hover:bg-[#B5541E] dark:hover:text-white rounded-lg shadow-xs transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
        </form>
    )
}