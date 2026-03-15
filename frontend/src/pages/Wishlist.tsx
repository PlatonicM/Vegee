import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Trash2, ArrowRight, ShoppingCart } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Wishlist() {
    const { user, token, wishlist, toggleWishlist, addToCart } = useAppContext()
    const [products, setProducts] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWishlistProducts = async () => {
            if (!token) {
                setLoading(false)
                return
            }
            try {
                const { data } = await axios.get("http://localhost:5000/api/user/wishlist", {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setProducts(data)
            } catch (error) {
                toast.error("Failed to load wishlist")
            } finally {
                setLoading(false)
            }
        }

        fetchWishlistProducts()
    }, [token, wishlist])

    if (!user) {
        return (
            <div className="pt-32 text-center min-h-[80vh] flex flex-col items-center justify-center bg-gray-50">
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                    <Heart size={40} />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-4">Your Wishlist</h2>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">Please login to save your favorite fresh vegetables and access them anytime.</p>
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
        return <div className="pt-32 text-center">Loading your wishlist...</div>
    }

    return (
        <div className="pt-24 min-h-screen pb-20 bg-gray-50">
            <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-end justify-between mb-12 text-center md:text-left">
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter">My Wishlist</h1>
                        <p className="text-gray-500 font-bold mt-2">Personal collection of your favorite picks.</p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-20 rounded-[3rem] text-center shadow-sm border border-gray-100"
                    >
                        <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-400 mb-6">Your wishlist is empty</h3>
                        <button 
                            onClick={() => navigate("/shop")}
                            className="bg-vegge-dark text-white px-8 py-3 rounded-2xl font-black hover:bg-vegge-DEFAULT transition shadow-lg inline-flex items-center gap-2"
                        >
                            Start Shopping <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <AnimatePresence>
                            {products.map((product) => (
                                <motion.div
                                    key={product._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white p-5 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition group relative overflow-hidden"
                                >
                                    <button 
                                        onClick={() => toggleWishlist(product._id)}
                                        className="absolute top-4 right-4 z-10 p-3 bg-white/80 backdrop-blur-md rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition shadow-sm"
                                    >
                                        <Trash2 size={18} />
                                    </button>

                                    <div className="aspect-square rounded-[1.8rem] overflow-hidden mb-5 border border-gray-50">
                                        <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={product.name} />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-gray-900 mb-1">{product.name}</h3>
                                        <p className="text-vegge-dark font-black text-2xl mb-4">₹{product.price}</p>
                                    </div>

                                    <button 
                                        onClick={() => addToCart(product)}
                                        disabled={!product.inStock}
                                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black shadow-lg hover:bg-vegge-DEFAULT transition active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:bg-gray-200"
                                    >
                                        <ShoppingCart size={18} /> {product.inStock ? "Add to Cart" : "Out of Stock"}
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}
