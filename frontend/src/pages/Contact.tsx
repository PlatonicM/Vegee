import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

import {
    Mail,
    Phone,
    MapPin,
    Send,
    Truck,
    Leaf,
    ShieldCheck,
    Clock,
    HeartHandshake,
    Globe,
    Users
} from "lucide-react"

export default function Contact() {

    const features = [
        {
            title: "Fresh Farm Produce",
            desc: "Vegetables sourced directly from trusted farmers.",
            icon: Leaf,
            color: "bg-green-500"
        },
        {
            title: "Fast Delivery",
            desc: "Quick grocery delivery to your doorstep.",
            icon: Truck,
            color: "bg-blue-500"
        },
        {
            title: "Quality Guarantee",
            desc: "Strict quality checks on every product.",
            icon: ShieldCheck,
            color: "bg-purple-500"
        },
        {
            title: "24/7 Support",
            desc: "Our team is available anytime for assistance.",
            icon: Clock,
            color: "bg-indigo-500"
        },
        {
            title: "Trusted Farmers",
            desc: "Partnering with local farmers for better produce.",
            icon: HeartHandshake,
            color: "bg-pink-500"
        },
        {
            title: "Sustainable Farming",
            desc: "Promoting eco-friendly agricultural practices.",
            icon: Globe,
            color: "bg-teal-500"
        },
        {
            title: "Happy Customers",
            desc: "Thousands of families trust Vegge daily.",
            icon: Users,
            color: "bg-yellow-500"
        }
    ]

    const [formData, setFormData] = useState({ name: "", email: "", subject: "Inquiry", message: "" })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await axios.post("http://localhost:5000/api/contact", formData)
            toast.success("Message sent successfully!")
            setFormData({ name: "", email: "", subject: "Inquiry", message: "" })
        } catch (error) {
            toast.error("Failed to send message.")
        } finally {
            setLoading(false)
        }
    }

    const fadeUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }
    const fadeLeft = { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } }
    const fadeRight = { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } }
    const fadeDown = { hidden: { opacity: 0, y: -60 }, visible: { opacity: 1, y: 0 } }

    return (
        <div className="pt-24 min-h-screen pb-20 bg-vegge-light/30">

            <div className="max-w-7xl mx-auto px-4 lg:px-8">

                {/* HEADER */}

                <motion.div
                    variants={fadeDown}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >

                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                        Contact Us
                    </h1>

                    <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
                        Have questions, feedback, or partnership ideas?
                        Our team is ready to help you anytime.
                    </p>

                </motion.div>


                {/* CONTACT SECTION */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">


                    {/* CONTACT FORM */}

                    <motion.div
                        variants={fadeLeft}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        className="bg-white p-10 rounded-3xl shadow border border-gray-100"
                    >

                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Send a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            <input
                                type="text"
                                required
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <input
                                type="email"
                                required
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <input
                                type="text"
                                required
                                placeholder="Subject"
                                value={formData.subject}
                                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <textarea
                                rows={4}
                                required
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-vegge-DEFAULT"
                            />

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={loading}
                                type="submit"
                                className="flex items-center gap-2 px-6 py-3 bg-vegge-DEFAULT hover:bg-vegge-dark text-white rounded-xl font-semibold transition disabled:opacity-50"
                            >
                                <Send size={18} />
                                {loading ? "Sending..." : "Send Message"}
                            </motion.button>

                        </form>

                    </motion.div>



                    {/* CONTACT DETAILS */}

                    <motion.div
                        variants={fadeRight}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.8 }}
                        className="bg-white p-10 rounded-3xl shadow border border-gray-100"
                    >

                        <h2 className="text-2xl font-bold text-gray-900 mb-8">
                            Contact Information
                        </h2>

                        <div className="space-y-6 text-gray-600">

                            <motion.div
                                whileHover={{ x: 6 }}
                                className="flex items-start gap-4"
                            >
                                <MapPin className="text-vegge-DEFAULT" />
                                <p>
                                    Rauth Niwas, Near KKITU Mobile Shop
                                    Sant Ravidas Chowk, Brahmapuri, Maharashtra
                                </p>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 6 }}
                                className="flex items-center gap-4"
                            >
                                <Phone className="text-vegge-DEFAULT" />
                                <p>+91 98765 43210</p>
                            </motion.div>

                            <motion.div
                                whileHover={{ x: 6 }}
                                className="flex items-center gap-4"
                            >
                                <Mail className="text-vegge-DEFAULT" />
                                <p>support@vegge.com</p>
                            </motion.div>

                        </div>

                    </motion.div>

                </div>


                {/* GOOGLE MAP */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.7 }}
                    className="bg-white p-5 rounded-3xl shadow border border-gray-100 mb-20"
                >

                    <iframe
                        title="Vegge Location"
                        src="https://maps.google.com/maps?q=Sant%20Ravidas%20Chowk%20Brahmapuri%20Maharashtra&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        className="w-full h-[420px] rounded-2xl border"
                        loading="lazy"
                    />

                </motion.div>


                {/* FEATURES */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.7 }}
                >

                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                        Why Choose Vegge
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

                        {features.map((feature, idx) => (

                            <motion.div
                                key={idx}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 1
                                }}
                                transition={{ type: "spring", stiffness: 200 }}
                                className="bg-white p-7 rounded-3xl shadow border border-gray-100 text-center hover:shadow-xl"
                            >

                                <div className={`w-16 h-16 ${feature.color} text-white flex items-center justify-center rounded-2xl mx-auto mb-5`}>
                                    <feature.icon className="w-8 h-8" />
                                </div>

                                <h3 className="font-bold text-lg text-gray-900 mb-2">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-500 text-sm">
                                    {feature.desc}
                                </p>

                            </motion.div>

                        ))}

                    </div>

                </motion.div>

            </div>

        </div>
    )
}