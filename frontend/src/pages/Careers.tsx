import { useState } from "react"
import { motion } from "framer-motion"
import {
    Briefcase,
    MapPin,
    Clock,
    ArrowRight,
    CheckCircle2,
    Globe,
    Heart,
    Rocket
} from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Careers() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        resumeUrl: "",
        message: ""
    })

    const [submitting, setSubmitting] = useState(false)

    const jobs = [
        { title: "Senior Logistics Lead", type: "Full-Time", location: "Nagpur", category: "Operations" },
        { title: "Organic Growth Manager", type: "Remote", location: "Mumbai", category: "Marketing" },
        { title: "Frontend Visionary", type: "Contract", location: "Bangalore", category: "Engineering" },
        { title: "Farm Relations Officer", type: "Full-Time", location: "Nashik", category: "Relations" }
    ]

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (!formData.position) {
            toast.error("Select a position first")
            return
        }

        try {

            setSubmitting(true)

            await axios.post("http://localhost:5000/api/careers/apply", formData)

            toast.success("Application submitted!")

            setFormData({
                name: "",
                email: "",
                position: "",
                resumeUrl: "",
                message: ""
            })

        }
        catch {
            toast.error("Submission failed")
        }
        finally {
            setSubmitting(false)
        }

    }

    return (

        <div className="bg-white min-h-screen pt-24 pb-16 px-4">

            <div className="max-w-6xl mx-auto">

                {/* HERO */}

                <div className="text-center max-w-2xl mx-auto mb-16">

                    <span className="inline-block px-4 py-1 bg-vegge-light/40 text-vegge-dark text-[11px] font-bold uppercase tracking-widest rounded-full mb-4">
                        Careers
                    </span>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Build the Future of <span className="text-vegge-DEFAULT">Fresh Food</span>
                    </h1>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        Join our mission to deliver organic farm produce faster,
                        fresher and smarter.
                    </p>

                </div>


                {/* VALUES */}

                <div className="grid md:grid-cols-3 gap-6 mb-20">

                    {[
                        {
                            title: "Fair Culture",
                            icon: Heart,
                            desc: "Transparent growth and equal opportunity."
                        },
                        {
                            title: "Global Impact",
                            icon: Globe,
                            desc: "Build solutions for sustainable agriculture."
                        },
                        {
                            title: "Fast Growth",
                            icon: Rocket,
                            desc: "Your ideas can directly impact thousands."
                        }
                    ].map((value, i) => {

                        const Icon = value.icon

                        return (

                            <motion.div
                                key={i}
                                whileHover={{ y: -6 }}
                                className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100 transition"
                            >

                                <div className="mx-auto w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm mb-3">
                                    <Icon size={18} />
                                </div>

                                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                    {value.title}
                                </h4>

                                <p className="text-xs text-gray-500 leading-relaxed">
                                    {value.desc}
                                </p>

                            </motion.div>

                        )

                    })}

                </div>


                {/* JOB LIST */}

                <div className="space-y-4 mb-20">

                    <div className="flex justify-between items-center mb-4">

                        <h2 className="text-2xl font-black text-gray-900">
                            Open Roles
                        </h2>

                        <span className="text-xs text-gray-400 font-bold uppercase">
                            {jobs.length} Positions
                        </span>

                    </div>

                    {jobs.map((job, i) => (

                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            onClick={() => setFormData({ ...formData, position: job.title })}
                            className={`flex flex-col md:flex-row justify-between items-center gap-4 p-5 rounded-xl border cursor-pointer transition ${formData.position === job.title
                                    ? "bg-vegge-dark text-white border-transparent"
                                    : "bg-gray-50 border-gray-100"
                                }`}
                        >

                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                    <Briefcase size={16} />
                                </div>

                                <div>

                                    <h3 className="font-semibold text-sm">
                                        {job.title}
                                    </h3>

                                    <div className="flex gap-3 text-[11px] text-gray-400 mt-1">

                                        <span className="flex items-center gap-1">
                                            <MapPin size={12} /> {job.location}
                                        </span>

                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {job.type}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            <div className="flex items-center gap-3">

                                <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-gray-400 border border-gray-100">
                                    {job.category}
                                </span>

                                {formData.position === job.title &&
                                    <CheckCircle2 className="text-vegge-DEFAULT" size={20} />
                                }

                            </div>

                        </motion.div>

                    ))}

                </div>


                {/* APPLY FORM */}

                <div className="grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-gray-100 shadow-lg">

                    {/* LEFT PANEL */}

                    <div className="bg-vegge-dark text-white p-10 flex flex-col justify-center">

                        <h3 className="text-2xl font-black mb-4">
                            Apply Now
                        </h3>

                        <p className="text-white/70 text-sm mb-6">
                            Submit your profile and our hiring team will review
                            within 48 hours.
                        </p>

                        <ul className="space-y-2 text-xs text-white/70">

                            <li>✔ Instant application</li>
                            <li>✔ Secure data privacy</li>
                            <li>✔ Human review guaranteed</li>

                        </ul>

                    </div>


                    {/* FORM */}

                    <div className="p-10 bg-white">

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                required
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <input
                                required
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <input
                                required
                                type="url"
                                placeholder="Resume / Portfolio URL"
                                value={formData.resumeUrl}
                                onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <textarea
                                rows={4}
                                placeholder="Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full py-3 bg-vegge-DEFAULT hover:bg-vegge-dark text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition"
                            >

                                {submitting ? "Submitting" : "Apply Now"}

                                <ArrowRight size={16} />

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>

    )

}