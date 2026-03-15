import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useAppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    ArrowRight,
    Leaf,
    ShieldCheck,
    Truck
} from "lucide-react"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const { login } = useAppContext()
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password }
            )
            login(data.user, data.token)
            toast.success("Welcome back to Vegee!")
            navigate("/")
        } catch (err: any) {
            toast.error(err.response?.data?.error || "Login Failed")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen py-24 px-4 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl flex flex-col md:flex-row rounded-[3rem] overflow-hidden shadow-2xl bg-white border border-gray-100"
            >
                {/* LEFT PANEL: BRAND DISCOVERY */}
                <div className="relative bg-vegge-dark text-white p-14 lg:p-16 flex flex-col justify-between overflow-hidden md:w-1/2">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-vegge-DEFAULT/30 rounded-full blur-[140px]"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[140px]"
                    />

                    <div className="relative z-10">
                        <Link to="/" className="inline-block mb-12">
                            <h1 className="text-5xl font-black tracking-tight text-white hover:text-green-300 transition-colors">
                                Vegee<span className="text-vegge-DEFAULT"></span>
                            </h1>
                        </Link>
                        <h2 className="text-5xl font-extrabold leading-[1.1] mb-8 tracking-tighter">
                            Freshness delivered<br />to your doorstep
                        </h2>
                        <p className="text-white/80 text-xl font-medium max-w-sm leading-relaxed">
                            Join thousands of happy customers eating fresh and healthy every day
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6 mt-12">
                        {[
                            { icon: Leaf, text: "100% Organic produce from local farms" },
                            { icon: ShieldCheck, text: "Safe & contactless delivery" },
                            { icon: Truck, text: "Fast delivery within 24 hours" }
                        ].map((item, i) => {
                            const Icon = item.icon
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-5 group py-1"
                                >
                                    <div className="p-3 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors">
                                        <Icon size={22} />
                                    </div>
                                    <span className="font-bold text-lg">
                                        {item.text}
                                    </span>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                {/* RIGHT PANEL: LOGIN CONSOLE */}
                <div className="bg-white p-10 md:p-14 lg:p-20 flex items-center justify-center md:w-1/2">
                    <div className="w-full max-w-md">
                        <div className="mb-12">
                            <h3 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">
                                Welcome Back<span className="text-vegge-DEFAULT">!</span>
                            </h3>
                            <p className="text-gray-500 font-medium text-lg leading-relaxed">
                                Please enter your credentials to access your account
                            </p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-8">
                            <div className="space-y-6">
                                {/* EMAIL */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] ml-2">
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-vegge-DEFAULT transition" size={20} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="vegee123@gmail.com"
                                            className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-transparent rounded-[2rem] focus:ring-4 focus:ring-vegge-DEFAULT/10 focus:border-vegge-DEFAULT focus:bg-white outline-none transition-all font-bold text-gray-900"
                                        />
                                    </div>
                                </div>

                                {/* PASSWORD */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">
                                            Password
                                        </label>
                                        {/* <Link to="/forgot-password" title="Reset Password" className="text-xs font-black text-vegge-DEFAULT uppercase tracking-widest hover:underline">
                                            Reset Key?
                                        </Link> */}
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-vegge-DEFAULT transition" size={20} />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full pl-16 pr-16 py-5 bg-gray-50 border border-transparent rounded-[2rem] focus:ring-4 focus:ring-vegge-DEFAULT/10 focus:border-vegge-DEFAULT focus:bg-white outline-none transition-all font-bold text-gray-900"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition"
                                        >
                                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                type="submit"
                                className="w-full py-6 bg-vegge-DEFAULT hover:bg-vegge-dark text-white rounded-[2rem] font-black text-xl uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(22,163,74,0.3)] transition-all flex items-center justify-center gap-4 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? "Authenticating..." : "Login"}
                                {!loading && <ArrowRight className="group-hover:translate-x-2 transition" size={22} />}
                            </motion.button>
                        </form>

                        <div className="mt-12 text-center pt-10 border-t border-gray-50">
                            <span className="text-gray-400 font-bold">New User?</span>
                            <Link to="/register" className="text-vegge-dark font-black ml-2 hover:text-vegge-DEFAULT transition hover:underline">
                                Create Account
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}