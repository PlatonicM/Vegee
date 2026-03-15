import { motion } from "framer-motion"
import {
    Leaf,
    Truck,
    ShieldCheck,
    Users,
    Sprout,
    HeartHandshake,
    Globe,
    Target,
    Zap,
    Verified
} from "lucide-react"

export default function About() {

    const stats = [
        { label: "Active Farmers", value: "250+", icon: Sprout },
        { label: "Happy Customers", value: "15k+", icon: Users },
        { label: "Daily Deliveries", value: "1,200+", icon: Truck },
        { label: "Organic Products", value: "400+", icon: Leaf }
    ]

    const features = [
        {
            title: "Zero Middleman",
            desc: "Farm-to-door supply chain giving farmers fair income and fresher produce.",
            icon: HeartHandshake,
            color: "bg-green-50"
        },
        {
            title: "Certified Organic",
            desc: "All produce verified for strict organic quality standards.",
            icon: Verified,
            color: "bg-blue-50"
        },
        {
            title: "Eco Logistics",
            desc: "Low carbon delivery and recyclable packaging system.",
            icon: Globe,
            color: "bg-purple-50"
        }
    ]

    return (

        <div className="bg-white min-h-screen">

            {/* HERO */}

            <section className="pt-28 pb-16 px-4 text-center">

                <div className="max-w-5xl mx-auto">

                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1 bg-vegge-light/40 text-vegge-dark text-[11px] font-bold uppercase tracking-widest rounded-full mb-6"
                    >
                        Our Story
                    </motion.span>

                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                        Freshness from <span className="text-vegge-DEFAULT">Farm to Door</span>
                    </h1>

                    <p className="text-gray-500 text-sm md:text-base font-medium max-w-2xl mx-auto leading-relaxed">
                        Vegee is a community-driven platform bringing farm-fresh organic produce
                        directly to households while empowering local farmers.
                    </p>

                </div>

            </section>

            {/* STATS */}

            <section className="pb-16 px-4">

                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">

                    {stats.map((stat, i) => {

                        const Icon = stat.icon

                        return (

                            <motion.div
                                key={i}
                                whileHover={{ y: -6 }}
                                className="bg-gray-50 rounded-2xl p-6 text-center border border-gray-100"
                            >

                                <div className="mx-auto w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-3">
                                    <Icon size={18} />
                                </div>

                                <h4 className="text-2xl font-black text-gray-900">{stat.value}</h4>

                                <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest">
                                    {stat.label}
                                </p>

                            </motion.div>

                        )

                    })}

                </div>

            </section>

            {/* MISSION */}

            <section className="py-20 px-4">

                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

                    {/* LEFT */}

                    <div className="space-y-6">

                        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                            Our Mission
                        </h2>

                        <p className="text-gray-500 text-sm leading-relaxed">
                            Healthy food should be accessible to everyone. Vegee connects farms
                            directly to consumers, reducing supply chain costs while improving
                            freshness and farmer income.
                        </p>

                        <div className="space-y-5">

                            {features.map((f, i) => {

                                const Icon = f.icon

                                return (

                                    <div key={i} className="flex gap-4">

                                        <div className={`w-10 h-10 ${f.color} rounded-lg flex items-center justify-center`}>
                                            <Icon size={18} />
                                        </div>

                                        <div>

                                            <h4 className="font-semibold text-gray-900 text-sm">
                                                {f.title}
                                            </h4>

                                            <p className="text-gray-500 text-xs leading-relaxed">
                                                {f.desc}
                                            </p>

                                        </div>

                                    </div>

                                )

                            })}

                        </div>

                    </div>

                    {/* IMAGE */}

                    <div className="relative">

                        <img
                            src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea"
                            className="rounded-3xl shadow-xl object-cover w-full"
                        />

                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute bottom-[-20px] left-[-20px] bg-white p-5 rounded-2xl shadow-lg border border-gray-100 max-w-[200px]"
                        >

                            <div className="flex items-center gap-3 mb-2">

                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
                                    <Target size={16} />
                                </div>

                                <h5 className="text-sm font-bold text-gray-900">
                                    Direct Delivery
                                </h5>

                            </div>

                            <p className="text-gray-400 text-xs">
                                Harvested today, delivered tomorrow.
                            </p>

                        </motion.div>

                    </div>

                </div>

            </section>

            {/* VISION */}

            <section className="mx-4 mb-20 rounded-3xl bg-vegge-dark text-white py-20 px-6 text-center">

                <div className="max-w-3xl mx-auto">

                    <Zap className="mx-auto mb-6 text-vegge-DEFAULT" size={40} />

                    <h2 className="text-3xl md:text-4xl font-black mb-6">
                        Future of Sustainable Food
                    </h2>

                    <p className="text-white/70 text-sm leading-relaxed mb-8">
                        We are building a global ecosystem of smart organic farms
                        supplying cities in real time while minimizing food waste
                        and restoring ecological balance.
                    </p>

                    <button className="px-8 py-3 bg-vegge-DEFAULT rounded-full font-semibold text-sm hover:bg-white hover:text-vegge-dark transition">
                        Join Our Journey
                    </button>

                </div>

            </section>

        </div>

    )

}