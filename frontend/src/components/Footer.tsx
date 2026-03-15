import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Phone
} from "lucide-react";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Footer() {

    const container = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
    }

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0 }
    }

    return (

        <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 pt-20 pb-10">

            <div className="max-w-7xl mx-auto px-6">

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16"
                >

                    {/* BRAND */}

                    <motion.div variants={item}>

                        <Link
                            to="/"
                            className="flex items-center gap-3 text-2xl font-bold text-vegge-dark mb-5"
                        >

                            <span className="text-3xl">🥦</span>
                            Vegee

                        </Link>

                        <p className="text-gray-600 text-base leading-relaxed mb-6">

                            Fresh organic vegetables and fruits delivered directly from farms to your home.
                            Supporting local farmers and healthy living.

                        </p>


                        {/* SOCIAL */}

                        <div className="flex gap-4">

                            <motion.a
                                whileHover={{ scale: 1.15 }}
                                href="https://facebook.com/codeshivam"
                                target="_blank"
                                className="p-2 rounded-full bg-white shadow hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                                <Facebook size={20} />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.15 }}
                                href="https://instagram.com/m.r.n.u.n.03"
                                target="_blank"
                                className="p-2 rounded-full bg-white shadow hover:bg-pink-50 hover:text-pink-600 transition"
                            >
                                <Instagram size={20} />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.15 }}
                                href="https://twitter.com/yourprofile"
                                target="_blank"
                                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 hover:text-black transition"
                            >
                                <Twitter size={20} />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.15 }}
                                href="https://wa.me/+917030087366"
                                target="_blank"
                                className="p-2 rounded-full bg-white shadow hover:bg-green-50 hover:text-green-600 transition"
                            >
                                <Phone size={20} />
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.15 }}
                                href="https://linkedin.com/in/mrunalchaudhari-03"
                                target="_blank"
                                className="p-2 rounded-full bg-white shadow hover:bg-blue-50 hover:text-blue-700 transition"
                            >
                                <Linkedin size={20} />
                            </motion.a>

                        </div>

                    </motion.div>



                    {/* MAIN */}

                    <motion.div variants={item}>

                        <h3 className="font-bold text-lg text-gray-900 mb-5 border-l-4 border-vegge-DEFAULT pl-3">
                            Main
                        </h3>

                        <ul className="space-y-3 text-base text-gray-600">

                            <li>
                                <Link to="/" className="hover:text-vegge-DEFAULT transition relative group">
                                    Home
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-vegge-DEFAULT transition-all group-hover:w-full"></span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/categories" className="hover:text-vegge-DEFAULT transition relative group">
                                    Categories
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-vegge-DEFAULT transition-all group-hover:w-full"></span>
                                </Link>
                            </li>

                            <li>
                                <Link to="/shop" className="hover:text-vegge-DEFAULT transition relative group">
                                    Product
                                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-vegge-DEFAULT transition-all group-hover:w-full"></span>
                                </Link>
                            </li>

                        </ul>

                    </motion.div>



                    {/* COMPANY */}

                    <motion.div variants={item}>

                        <h3 className="font-bold text-lg text-gray-900 mb-5 border-l-4 border-vegge-DEFAULT pl-3">
                            Company
                        </h3>

                        <ul className="space-y-3 text-base text-gray-600">

                            <li><Link to="/about" className="hover:text-vegge-DEFAULT transition">About</Link></li>
                            <li><Link to="/contact" className="hover:text-vegge-DEFAULT transition">Contact</Link></li>
                            <li><Link to="/support" className="hover:text-vegge-DEFAULT transition">Support</Link></li>
                            <li><Link to="/careers" className="hover:text-vegge-DEFAULT transition">Careers</Link></li>

                        </ul>

                    </motion.div>



                    {/* CONTACT */}

                    <motion.div variants={item}>

                        <h3 className="font-bold text-lg text-gray-900 mb-5 border-l-4 border-vegge-DEFAULT pl-3">
                            Contact
                        </h3>

                        <ul className="space-y-3 text-base text-gray-600">

                            <li>📍 Bramhapuri, MH, India</li>

                            <li className="flex items-center gap-2">
                                <Phone size={16} /> +91 70300 87366
                            </li>

                            <li className="flex items-center gap-2">
                                <Mail size={16} /> support@vegee.com
                            </li>

                            <li>Mon – Sun : 8AM – 10PM</li>

                        </ul>

                    </motion.div>

                </motion.div>



                {/* FOOTER BOTTOM */}

                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-base text-gray-500">

                    <p>
                        © {new Date().getFullYear()} Vegee Grocery. All rights reserved.
                    </p>

                    <div className="flex gap-6 mt-3 md:mt-0">

                        <Link to="/terms" className="hover:text-vegge-DEFAULT transition">
                            Terms
                        </Link>

                        <Link to="/privacy" className="hover:text-vegge-DEFAULT transition">
                            Privacy
                        </Link>

                        <Link to="/cookies" className="hover:text-vegge-DEFAULT transition">
                            Cookies
                        </Link>

                    </div>

                </div>

            </div>

        </footer>

    )

}