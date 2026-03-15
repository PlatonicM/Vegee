import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { List, ShoppingCart, Trash2, ArrowRight, Bell } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Waitlist() {
    const { user, token, waitlist, toggleWaitlist, addToCart } = useAppContext()
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWaitlistProducts = async () => {
            if (!token) {
                setLoading(false)
                return
            }
            try {
                const { data } = await axios.get("http://localhost:5000/api/user/waitlist", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setProducts(data)
            } catch (error) {
                toast.error("Failed to load waitlist")
            } finally {
                setLoading(false)
            }
        }

        fetchWaitlistProducts()
    }, [token, waitlist])

    if (!user) {
        return (
            <div className="pt-32 text-center min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
                <div className="w-20 h-20 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-6">
                    <Bell size={40} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Your Waitlist</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Please login to see the items you're waiting for and get notified when they're back in stock.</p>
                <button 
                    onClick={() => navigate("/login")}
                    className="bg-vegge-dark text-white px-10 py-4 rounded-3xl font-black text-lg shadow-xl hover:bg-vegge-DEFAULT transition active:scale-95"
                >
                    Login Now
                </button>
            </div>
        )
    }

    if (loading) {
        return <div className="pt-32 text-center">Loading your waitlist...</div>
    }

    return (
        <div className="pt-24 min-h-screen pb-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter">Your Waitlist</h1>
                        <p className="text-gray-500 font-bold mt-2 flex items-center gap-2">
                           <Bell size={16} className="text-blue-500" /> We'll notify you as soon as these items are back!
                        </p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-20 rounded-[3rem] text-center shadow-sm border border-gray-100"
                    >
                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <List size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400 mb-6">Your waitlist is empty</h3>
                        <button 
                            onClick={() => navigate("/shop")}
                            className="bg-vegge-dark text-white px-8 py-3 rounded-2xl font-black hover:bg-vegge-DEFAULT transition shadow-lg inline-flex items-center gap-2"
                        >
                            Explore Products <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        <AnimatePresence>
                            {products.map((product) => (
                                <motion.div
                                    key={product._id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-6 hover:shadow-md transition group"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-28 h-28 rounded-3xl overflow-hidden border border-gray-100 shrink-0">
                                            <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={product.name} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${product.inStock ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                                    {product.inStock ? 'Back in Stock' : 'Out of Stock'}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-black text-gray-900 group-hover:text-vegge-DEFAULT transition">{product.name}</h3>
                                            <p className="text-gray-500 font-bold">₹{product.price}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {product.inStock ? (
                                            <button 
                                                onClick={() => {
                                                    addToCart(product)
                                                    toggleWaitlist(product._id)
                                                }}
                                                className="bg-vegge-DEFAULT text-white px-6 py-3 rounded-2xl font-black shadow-lg hover:bg-vegge-dark transition active:scale-95 flex items-center gap-2"
                                            >
                                                <ShoppingCart size={18} /> Add to Cart
                                            </button>
                                        ) : (
                                            <div className="px-6 py-3 bg-gray-50 rounded-2xl text-gray-400 font-black text-sm uppercase tracking-widest border border-gray-100">
                                                Waiting...
                                            </div>
                                        )}
                                        <button 
                                            onClick={() => toggleWaitlist(product._id)}
                                            className="p-4 text-red-500 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition duration-300"
                                            title="Remove from waitlist"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}
