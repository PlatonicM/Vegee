import { useState } from "react"
import { motion } from "framer-motion"
import {
    HelpCircle,
    Mail,
    Phone,
    MessageSquare,
    ShieldCheck,
    Truck,
    Send,
    CheckCircle2,
    ArrowRight
} from "lucide-react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Support() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "General Inquiry",
        message: ""
    })

    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        try {

            setSubmitting(true)

            await axios.post("http://localhost:5000/api/contact", formData)

            toast.success("Message sent!")

            setFormData({
                name: "",
                email: "",
                subject: "General Inquiry",
                message: ""
            })

        }
        catch {
            toast.error("Failed to send message")
        }
        finally {
            setSubmitting(false)
        }

    }

    const faqs = [
        {
            q: "How fast is delivery?",
            a: "We harvest and deliver within 24 hours to ensure freshness."
        },
        {
            q: "Where does produce come from?",
            a: "All vegetables come from certified organic farms within 100km."
        },
        {
            q: "Can I schedule delivery?",
            a: "Yes, choose a delivery slot during checkout."
        },
        {
            q: "What is the refund policy?",
            a: "Refund or replacement available within 4 hours of delivery."
        }
    ]

    return (

        <div className="bg-white min-h-screen pt-28 pb-16 px-4">

            <div className="max-w-6xl mx-auto">

                {/* HERO */}

                <div className="text-center mb-16">

                    <span className="inline-block px-4 py-1 bg-vegge-light/40 text-vegge-dark text-[11px] font-bold uppercase tracking-widest rounded-full mb-5">
                        Support Center
                    </span>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        Help & <span className="text-vegge-DEFAULT">Assistance</span>
                    </h1>

                    <p className="text-gray-500 text-sm max-w-xl mx-auto">
                        Need help with your order or account? Our support team is
                        available 24/7 to assist you.
                    </p>

                </div>


                {/* SUPPORT BOX */}

                <div className="grid lg:grid-cols-2 rounded-3xl border border-gray-100 shadow-lg overflow-hidden mb-20">

                    {/* LEFT CONTACT */}

                    <div className="bg-vegge-dark text-white p-10">

                        <h3 className="text-2xl font-black mb-4">
                            Contact Us
                        </h3>

                        <p className="text-white/70 text-sm mb-8">
                            Reach our support team through official channels.
                        </p>

                        <div className="space-y-6">

                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Mail size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-white/50">Email</p>
                                    <p className="font-semibold text-sm">
                                        support@vegee.com
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                                    <Phone size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-white/50">Phone</p>
                                    <p className="font-semibold text-sm">
                                        +91 98765 04321
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* CONTACT FORM */}

                    <div className="p-10 bg-white">

                        <form onSubmit={handleSubmit} className="space-y-5">

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
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <select
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            >

                                <option>General Inquiry</option>
                                <option>Order Problem</option>
                                <option>Delivery Feedback</option>
                                <option>Partnership</option>

                            </select>

                            <textarea
                                rows={4}
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <button
                                disabled={submitting}
                                type="submit"
                                className="w-full py-3 bg-vegge-DEFAULT hover:bg-vegge-dark text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition"
                            >

                                {submitting ? "Sending" : "Send Message"}

                                <Send size={16} />

                            </button>

                        </form>

                    </div>

                </div>


                {/* FAQ */}

                <div className="grid md:grid-cols-2 gap-10 mb-16">

                    <div>

                        <h2 className="text-2xl font-black text-gray-900 mb-6">
                            Common Questions
                        </h2>

                        <div className="grid grid-cols-2 gap-4">

                            {[
                                { icon: Truck, text: "Live Tracking" },
                                { icon: ShieldCheck, text: "Refund Policy" },
                                { icon: MessageSquare, text: "24/7 Chat" },
                                { icon: HelpCircle, text: "Farm FAQ" }
                            ].map((item, i) => {

                                const Icon = item.icon

                                return (

                                    <div
                                        key={i}
                                        className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100"
                                    >

                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-vegge-DEFAULT">
                                            <Icon size={16} />
                                        </div>

                                        <span className="text-sm font-medium text-gray-700">
                                            {item.text}
                                        </span>

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                    <div className="space-y-4">

                        {faqs.map((faq, i) => (

                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-50 p-5 rounded-xl border border-gray-100"
                            >

                                <div className="flex gap-3">

                                    <CheckCircle2
                                        size={18}
                                        className="text-vegge-DEFAULT mt-1"
                                    />

                                    <div>

                                        <h4 className="text-sm font-semibold text-gray-900">
                                            {faq.q}
                                        </h4>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {faq.a}
                                        </p>

                                    </div>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                </div>


                {/* CTA */}

                <div className="text-center bg-gray-50 border border-gray-100 rounded-3xl p-12">

                    <h3 className="text-2xl font-black text-gray-900 mb-3">
                        Still Need Help?
                    </h3>

                    <p className="text-gray-500 text-sm mb-6">
                        Chat with our support team for instant help.
                    </p>

                    <button className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-semibold flex items-center gap-2 mx-auto hover:bg-vegge-DEFAULT hover:text-white transition">

                        Live Chat

                        <ArrowRight size={16} />

                    </button>

                </div>

            </div>

        </div>

    )

}