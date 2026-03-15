import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Tag, Zap, ShoppingCart, ArrowRight, Loader } from "lucide-react"
import axios from "axios"
import { useAppContext } from "../context/AppContext"
import { toast } from "react-toastify"

interface Product {
    _id: string
    name: string
    description: string
    price: number
    discountPrice?: number
    image: string
    onSale?: boolean
}

export default function Offers() {

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const { addToCart } = useAppContext()

    useEffect(() => {

        const fetchOffers = async () => {

            try {

                const { data } = await axios.get("http://localhost:5000/api/products")

                const onSaleProducts = data.filter((p: Product) => p.onSale || p.discountPrice)

                setProducts(onSaleProducts)

            }
            catch (err) {
                console.error("Failed to fetch offers", err)
            }
            finally {
                setLoading(false)
            }

        }

        fetchOffers()

    }, [])

    return (

        <div className="bg-white min-h-screen pt-28 pb-16 px-4">

            <div className="max-w-6xl mx-auto">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">

                    <div className="max-w-xl">

                        <span className="inline-flex items-center gap-2 px-4 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                            <Zap size={14} />
                            Flash Deals
                        </span>

                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                            Seasonal <span className="text-vegge-DEFAULT">Savings</span>
                        </h1>

                    </div>

                    <p className="text-gray-500 text-sm md:text-base max-w-sm border-l-2 border-gray-100 pl-4">
                        Grab farm-direct discounts before the harvest sells out.
                    </p>

                </div>


                {/* LOADING */}

                {loading ? (

                    <div className="flex flex-col items-center justify-center py-32">

                        <Loader className="animate-spin text-vegge-DEFAULT mb-4" size={36} />

                        <p className="text-gray-400 text-sm font-semibold">
                            Loading deals...
                        </p>

                    </div>

                )

                    : products.length > 0 ? (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                            {products.map((product, i) => {

                                const discountPercent = Math.round(
                                    ((product.price - (product.discountPrice || product.price)) / product.price) * 100
                                )

                                return (

                                    <motion.div
                                        key={product._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group"
                                    >

                                        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 mb-4 shadow-sm group-hover:shadow-lg transition">

                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />

                                            {/* DISCOUNT */}

                                            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-lg shadow text-xs font-bold flex items-center gap-1">

                                                <Tag size={14} className="text-vegge-DEFAULT" />

                                                -{discountPercent}%

                                            </div>

                                            {/* BUTTON */}

                                            <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition">

                                                <button
                                                    onClick={() => {
                                                        addToCart(product)
                                                        toast.success(`${product.name} added`)
                                                    }}
                                                    className="w-full py-3 bg-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-vegge-DEFAULT hover:text-white transition"
                                                >

                                                    <ShoppingCart size={16} />
                                                    Add to Cart

                                                </button>

                                            </div>

                                        </div>

                                        {/* INFO */}

                                        <div className="flex justify-between items-start">

                                            <div>

                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {product.name}
                                                </h3>

                                                <p className="text-gray-500 text-sm line-clamp-2">
                                                    {product.description}
                                                </p>

                                            </div>

                                            <div className="text-right">

                                                <span className="text-lg font-bold text-vegge-DEFAULT">
                                                    ₹{product.discountPrice || product.price}
                                                </span>

                                                {product.discountPrice && (
                                                    <p className="text-xs text-gray-400 line-through">
                                                        ₹{product.price}
                                                    </p>
                                                )}

                                            </div>

                                        </div>

                                    </motion.div>

                                )

                            })}

                        </div>

                    )

                        : (

                            <div className="text-center py-32 bg-gray-50 rounded-3xl border border-dashed border-gray-200">

                                <Tag className="mx-auto text-gray-200 mb-4" size={60} />

                                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                    No Active Offers
                                </h2>

                                <p className="text-gray-400 text-sm">
                                    Check back later for new discounts.
                                </p>

                            </div>

                        )}


                {/* PROMO SECTION */}

                <div className="mt-24 grid md:grid-cols-3 gap-6">

                    {[
                        { title: "First Order", desc: "Extra 10% off for new customers", icon: Zap },
                        { title: "Member Rewards", desc: "Earn points on every order", icon: Tag },
                        { title: "Free Delivery", desc: "Free delivery above ₹499", icon: ArrowRight }
                    ].map((item, i) => {

                        const Icon = item.icon

                        return (

                            <div
                                key={i}
                                className="p-6 bg-gray-50 rounded-xl border border-gray-100"
                            >

                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-vegge-DEFAULT mb-3 shadow-sm">
                                    <Icon size={18} />
                                </div>

                                <h4 className="text-sm font-semibold text-gray-900">
                                    {item.title}
                                </h4>

                                <p className="text-xs text-gray-500">
                                    {item.desc}
                                </p>

                            </div>

                        )

                    })}

                </div>


                {/* CTA */}

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="mt-24 p-10 bg-vegge-dark rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6"
                >

                    <div>

                        <h2 className="text-2xl font-bold mb-2">
                            Become a Vegee Insider
                        </h2>

                        <p className="text-white/70 text-sm">
                            Get early access to exclusive deals and rewards.
                        </p>

                    </div>

                    <button className="px-6 py-3 bg-vegge-DEFAULT rounded-full text-sm font-semibold flex items-center gap-2">

                        Join Now

                        <ArrowRight size={16} />

                    </button>

                </motion.div>

            </div>

        </div>

    )

}