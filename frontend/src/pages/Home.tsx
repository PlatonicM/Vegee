import { useEffect, useState } from 'react';
import axios from 'axios';
import { Star } from "lucide-react";
import ProductCard, { Product } from '../components/ProductCard';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';




export default function Home() {
    const [featured, setFeatured] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/products?search=`);
                setFeatured(data.slice(0, 4)); // Show 4 items
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    const containerVariants: any = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300 } }
    };

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % 10)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    /* CATEGORIES */
    const categories = [
        {
            name: "Fresh Fruits",
            slug: "fruits",
            img: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80",
            badge: "New",
        },
        {
            name: "Vegetables",
            slug: "vegetables",
            img: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400&q=80",
            badge: "Popular",
        },
        {
            name: "Leafy Greens",
            slug: "leafy",
            img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80",
        },
        {
            name: "Root Veggies",
            slug: "root",
            img: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=80",
        },
        {
            name: "Fenugreek Leaves",
            slug: "fenugreek",
            img: "https://media.istockphoto.com/id/951647074/photo/close-up-of-fersh-raw-methi-plant-or-fenugreek-plant-on-a-brown-wooden-surface.webp?a=1&b=1&s=612x612&w=0&k=20&c=rChRic_SQFy1vX6Rye85cDvMq8dXBPSUo-EiLq5U5DI=",
        },
        {
            name: "Green Chili",
            slug: "green-chili",
            img: "https://images.unsplash.com/photo-1524593410820-38510f580a77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R3JlZW4lMjBDaGlsaXxlbnwwfHwwfHx8MA%3D%3D",
        },
    ];


    return (
        <div className="pt-16 min-h-screen bg-gray-50">
            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-br from-vegge-dark via-vegge-DEFAULT to-green-400 text-white overflow-hidden min-h-[85vh] flex items-center">
                {/* animated background circles */}
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl mix-blend-overlay"
                />
                <motion.div
                    animate={{ rotate: -360, scale: [1, 1.15, 1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-black/10 rounded-full blur-3xl mix-blend-overlay"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* TEXT CONTENT */}
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block py-1 px-3 rounded-full bg-white/20 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md"
                        >
                            100% Organic Delivery
                        </motion.span>
                        <motion.h1
                            initial={{ y: 40, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
                        >
                            Fresh Vegetables  <br className="hidden md:block" />
                            <span className="text-yellow-300 drop-shadow-md">
                                Everyday
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-2xl font-medium text-vegge-light mb-10 opacity-90 max-w-xl"
                        >
                            Vegee brings farm-fresh vegetables and fruits straight to your doorstep.
                            Healthy, organic, and always fresh.
                        </motion.p>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.08 }}>
                                <Link
                                    to="/shop"
                                    className="bg-white text-vegge-dark px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all text-center"
                                >
                                    Buy Now
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.08 }}>
                                <a
                                    href="#about"
                                    className="bg-vegge-dark/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-vegge-dark/50 transition-all text-center"
                                >
                                    Learn More
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                    {/* HERO IMAGE */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden lg:block"
                    >
                        <motion.img
                            src="https://plus.unsplash.com/premium_photo-1663100070394-976122436933?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Fresh Vegetables"
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-auto rounded-[3rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white/10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 bg-white relative overflow-hidden">
                {/* soft animated background */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-vegge-light blur-[120px]"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: '100% Organic', desc: 'Sourced directly from certified organic farms, pesticide-free.', icon: Leaf },
                            { title: 'Fast Delivery', desc: 'Get your groceries delivered to your door within hours.', icon: Truck },
                            { title: 'Secure Quality', desc: 'We visually inspect every vegetable for top-tier quality.', icon: ShieldCheck }
                        ].map((ft, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.05,
                                    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
                                }}
                                className="p-8 rounded-3xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-xl transition-all text-center group relative overflow-hidden"
                            >
                                {/* glow hover border */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-vegge-DEFAULT rounded-3xl transition duration-500"></div>
                                <div className="w-20 h-20 mx-auto bg-vegge-light rounded-full flex items-center justify-center mb-6 group-hover:bg-vegge-DEFAULT group-hover:text-white transition-colors text-vegge-DEFAULT">
                                    <motion.div
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <ft.icon className="w-10 h-10" />
                                    </motion.div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {ft.title}
                                </h3>
                                <p className="text-gray-500 leading-relaxed">
                                    {ft.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SHOP BY CATEGORY */}
            <section className="py-20 bg-vegge-light/30 relative overflow-hidden">

                {/* Background Glow */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-vegge-light blur-[120px]"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl font-extrabold text-gray-900 mb-4"
                    >
                        Shop By Category
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-gray-500 mb-12 max-w-2xl mx-auto text-lg"
                    >
                        Browse our wide selection of fresh produce mapped perfectly to your dietary needs.
                    </motion.p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.slug}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.12 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >

                                <Link
                                    to={`/shop?category=${cat.slug}`}
                                    className="relative h-64 rounded-3xl overflow-hidden group shadow-md hover:shadow-2xl transition-all block"
                                >

                                    <motion.img
                                        src={cat.img}
                                        alt={cat.name}
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 w-full h-full object-cover brightness-95 group-hover:brightness-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">

                                        {cat.badge && (
                                            <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                                                {cat.badge}
                                            </span>
                                        )}

                                        <h3 className="text-white text-2xl font-bold tracking-wide">
                                            {cat.name}
                                        </h3>

                                    </div>

                                </Link>

                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-24 bg-white relative overflow-hidden">

                {/* soft background glow */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-vegge-light/30 blur-[120px]"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="flex justify-between items-end mb-12">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >

                            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                                Featured Items
                            </h2>

                            <p className="text-gray-500 text-lg">
                                Hand-picked fresh arrivals just for you.
                            </p>

                        </motion.div>


                        <motion.div
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >

                            <Link
                                to="/shop"
                                className="text-vegge-DEFAULT font-bold hover:underline hidden sm:block"
                            >

                                View All

                            </Link>

                        </motion.div>

                    </div>


                    {featured.length > 0 && (

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >

                            {featured.map((product) => (

                                <motion.div
                                    key={product._id}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -12,
                                        scale: 1.04,
                                        boxShadow: "0px 20px 40px rgba(214, 99, 99, 0.15)"
                                    }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                >

                                    <ProductCard product={product} />

                                </motion.div>

                            ))}

                        </motion.div>

                    )}


                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-10 sm:hidden"
                    >

                        <Link
                            to="/shop"
                            className="text-vegge-DEFAULT font-bold hover:underline"
                        >

                            View All Products

                        </Link>

                    </motion.div>

                </div>

            </section>

            {/* EXTRA FEATURES */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">

                {/* soft animated background */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-vegge-light/30 blur-[120px] opacity-40"
                />

                <div className="max-w-7xl mx-auto px-4 relative z-10">

                    <h2 className="text-4xl font-bold text-center mb-14">
                        Why Customers Love Vegee
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

                        {[
                            { title: "Fresh Daily", desc: "Harvested every morning", icon: "🥬" },
                            { title: "Local Farms", desc: "Supporting local farmers", icon: "🚜" },
                            { title: "Eco Friendly", desc: "Plastic-free packaging", icon: "🌱" },
                            { title: "Best Prices", desc: "Affordable organic food", icon: "💰" },
                            { title: "Healthy Living", desc: "Eat better everyday", icon: "❤️" }
                        ].map((f, i) => (

                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                whileHover={{
                                    y: -12,
                                    scale: 1.05,
                                    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
                                }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-2xl shadow text-center border border-gray-100 relative overflow-hidden"
                            >

                                {/* glow hover border */}
                                <div className="absolute inset-0 border-2 border-transparent hover:border-vegge-DEFAULT rounded-2xl transition duration-500"></div>

                                <div className="text-4xl mb-4">
                                    {f.icon}
                                </div>

                                <h3 className="font-bold text-lg mb-2 text-gray-800">
                                    {f.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {f.desc}
                                </p>

                            </motion.div>

                        ))}

                    </div>

                </div>

            </section>

            {/* IMAGE CAROUSEL */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">

                    <h2 className="text-4xl font-bold text-center mb-10">
                        Fresh From Our Farms
                    </h2>

                    <div className="overflow-hidden relative">

                        <motion.div
                            animate={{ x: `-${index * 320}px` }}
                            transition={{ ease: "easeInOut", duration: 0.8 }}
                            className="flex gap-6"
                        >

                            {[
                                "https://plus.unsplash.com/premium_photo-1734691183492-a037e59c9828?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDkwfHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1720539179947-b8b03094afd7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYzfHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1677781688642-f571db368c0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDY2fHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1663100876161-d254f1266646?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExNnx8fGVufDB8fHx8fA%3D%3D",
                                "https://plus.unsplash.com/premium_photo-1663051301745-1eb19599eb9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyMXx8fGVufDB8fHx8fA%3D%3D",
                                "https://plus.unsplash.com/premium_photo-1724129050436-bf733243c030?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyMnx8fGVufDB8fHx8fA%3D%3D",
                                "https://plus.unsplash.com/premium_photo-1686285540093-0613f74311dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwMHx8fGVufDB8fHx8fA%3D%3D",
                                "https://plus.unsplash.com/premium_photo-1679504288899-1c6fe20d140f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDk4fHx8ZW58MHx8fHx8",
                                "https://images.unsplash.com/photo-1641417567586-b9686bc4bc91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHZlZ2V0YWJsZSUyMHNob3BlfGVufDB8fDB8fHww",
                                "https://images.unsplash.com/photo-1580334571318-a51dfe93f27f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fHZlZ2V0YWJsZSUyMHNob3BlfGVufDB8fDB8fHww",
                                "https://images.unsplash.com/photo-1642495620156-8450bdaceec1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHx2ZWdldGFibGUlMjBzaG9wZXxlbnwwfHwwfHx8MA%3D%3D",
                                "https://media.istockphoto.com/id/658085658/photo/vegetables-on-a-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=W51QmZi6eSieaEWtN8OO1Cp7DfpcFhPMY7BICJMSeKM=",
                                "https://plus.unsplash.com/premium_photo-1663047856766-6fe0b0309ddb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8fHw%3D",
                                "https://plus.unsplash.com/premium_photo-1741466800939-491f777d8b20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1708971732855-57ae6d7f628e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1664302148512-ddea30cd2a92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDg1fHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1700695638084-5f46e469e223?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1661434320540-846c836800bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM0fHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1672422021475-5e0b3c8d1558?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1667509300474-aa980aeee695?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDYyfHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1726761629273-ee5df6e6adbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8",
                                "https://plus.unsplash.com/premium_photo-1661499438210-2565790e1f65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDc4fHx8ZW58MHx8fHx8",
                            ].map((img, i) => (
                                <motion.img
                                    key={i}
                                    src={img}
                                    whileHover={{ scale: 1.05 }}
                                    className="w-80 h-56 object-cover rounded-3xl shadow-lg"
                                />
                            ))}

                        </motion.div>

                    </div>

                </div>
            </section>

            {/* ABOUT & SERVICES */}
            <section id="about" className="py-24 bg-gradient-to-br from-vegge-dark via-vegge-DEFAULT to-green-400 text-white overflow-hidden relative">

                {/* animated background glow */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute top-0 right-0 w-1/2 h-full bg-vegge-dark/20 blur-[100px] pointer-events-none"
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* TEXT SIDE */}

                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >

                        <h2 className="text-4xl font-extrabold mb-6">
                            Known Vegee
                        </h2>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Started in 2026, Vegee has revolutionized the way people buy groceries.
                            We connect local organic farmers directly with consumers, cutting out long
                            transit times that kill freshness. Every leaf, root, and fruit you buy from us
                            promises quality, earth-friendly farming, and unparalleled taste.
                        </p>
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-800/40 p-4 rounded-2xl"
                            >
                                <h4 className="text-4xl font-black text-vegge-DEFAULT">
                                    10k+
                                </h4>
                                <p className="text-gray-400">
                                    Happy Customers
                                </p>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-800/40 p-4 rounded-2xl"
                            >
                                <h4 className="text-4xl font-black text-vegge-DEFAULT">
                                    150+
                                </h4>
                                <p className="text-gray-400">
                                    Local Partner Farms
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                    {/* IMAGE SIDE */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <motion.img
                            src="https://plus.unsplash.com/premium_photo-1661902195336-996462e0d1d6?q=80&w=961&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Farmer"
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ duration: 0.4 }}
                            className="rounded-3xl shadow-2xl relative z-10 border border-gray-700"
                        />
                        {/* floating rating card */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            whileHover={{ scale: 1.05 }}
                            className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-gray-100 z-20 hidden sm:block"
                        >

                            <p className="text-gray-900 font-bold text-xl mb-1">
                                Top Rated Food
                            </p>
                            <div className="flex items-center gap-1 text-yellow-400 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>
                            <p className="text-gray-500 text-sm">
                                4.9 Rating • 10k+ Customers
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

            </section>
            {/* CUSTOMER REVIEWS */}
            <section className="py-24 bg-gradient-to-b from-white via-green-50 to-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
                        What Our Customers Say
                    </h2>
                    <div className="overflow-hidden">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                            className="flex gap-6 w-max"
                        >
                            {[
                                { name: "Amit", text: "Best vegetables I've ever ordered online!" },
                                { name: "Priya", text: "Super fresh and delivered very fast." },
                                { name: "Rahul", text: "Great quality and packaging." },
                                { name: "Sneha", text: "Healthy food for my family." },
                                { name: "Karan", text: "Amazing organic produce." },
                                { name: "Neha", text: "Love the freshness!" },
                                { name: "Arjun", text: "Very reliable service." },
                                { name: "Pooja", text: "Best grocery platform." },
                                { name: "Ravi", text: "Vegetables were farm fresh." },
                                { name: "Anita", text: "Highly recommended!" },
                                { name: "Rohan", text: "Fresh vegetables every time." },
                                { name: "Simran", text: "Delivery is always quick." },
                                { name: "Ajay", text: "My go-to grocery store." },
                                { name: "Divya", text: "Organic food tastes better." },
                                { name: "Vikas", text: "Great customer support." },
                                { name: "Meera", text: "Quality is always top." },
                                { name: "Sanjay", text: "Love their vegetables." },
                                { name: "Kavita", text: "Farm fresh products." },
                                { name: "Nikhil", text: "Very clean packaging." },
                                { name: "Alka", text: "Highly satisfied!" }
                            ].map((review, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{
                                        scale: 1.07,
                                        rotateY: 6,
                                        boxShadow: "0px 20px 40px rgba(0,0,0,0.15)"
                                    }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="min-w-[300px] bg-gradient-to-br from-white via-green-50 to-green-100 p-6 rounded-3xl border border-green-100 shadow-md hover:border-green-400 relative overflow-hidden"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 rounded-3xl border-2 border-green-400"></div>
                                    {/* Review text */}
                                    <p className="text-gray-600 mb-4 leading-relaxed italic">
                                        "{review.text}"
                                    </p>
                                    {/* User section */}
                                    <div className="flex items-center gap-3">
                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-green-800 text-lg">
                                                {review.name}
                                            </div>

                                            {/* Stars */}
                                            <div className="text-yellow-400 text-sm">
                                                ★★★★★
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
