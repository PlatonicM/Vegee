import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Leaf, ShieldCheck, Sparkles } from "lucide-react"

export default function AuthLayout({
    title,
    subtitle,
    children
}: {
    title: string
    subtitle: string
    children: React.ReactNode
}) {

    return (

        <div className="bg-gray-50 pt-32 pb-24 px-4 flex justify-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl grid md:grid-cols-2 rounded-[3rem] overflow-hidden shadow-2xl bg-white"
            >

                {/* LEFT PANEL */}

                <div className="relative bg-vegge-dark text-white p-14 lg:p-16 flex flex-col justify-between overflow-hidden">

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-vegge-DEFAULT/40 rounded-full blur-[140px]"
                    />

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-green-500/30 rounded-full blur-[140px]"
                    />

                    <div className="relative z-10">

                        <Link to="/" className="inline-block mb-12">
                            <h1 className="text-5xl font-black tracking-tight">
                                Vegee<span className="text-green-200">.</span>
                            </h1>
                        </Link>

                        <h2 className="text-4xl font-extrabold leading-tight mb-6">
                            {title}
                        </h2>

                        <p className="text-white/80 text-lg font-medium">
                            {subtitle}
                        </p>

                    </div>

                    <div className="relative z-10 space-y-6">

                        {[
                            { icon: Leaf, text: "Direct from organic farms" },
                            { icon: ShieldCheck, text: "Verified quality produce" },
                            { icon: Sparkles, text: "Exclusive member discounts" }
                        ].map((item, i) => {

                            const Icon = item.icon

                            return (

                                <motion.div
                                    key={i}
                                    whileHover={{ x: 6 }}
                                    className="flex items-center gap-4"
                                >

                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <Icon size={20} />
                                    </div>

                                    <span className="font-semibold">
                                        {item.text}
                                    </span>

                                </motion.div>

                            )

                        })}

                    </div>

                </div>

                {/* RIGHT FORM */}

                <div className="bg-white p-10 md:p-14 flex items-center justify-center">

                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full max-w-md"
                    >

                        {children}

                    </motion.div>

                </div>

            </motion.div>

        </div>

    )

}