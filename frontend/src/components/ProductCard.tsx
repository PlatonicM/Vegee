import { Plus, Check, Heart, Star, Eye, ShoppingCart } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPrice?: number;
    onSale?: boolean;
    category: any;
    image: string;
    inStock: boolean;
    rating?: number;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, toggleWishlist, toggleWaitlist, wishlist, waitlist } = useAppContext()
    const [added, setAdded] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const isLiked = wishlist.includes(product._id)
    const isWaiting = waitlist.includes(product._id)

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        addToCart(product)
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    const handleWishlist = (e: React.MouseEvent) => {
        e.stopPropagation()
        toggleWishlist(product._id)
    }

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ y: -12 }}
            className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden flex flex-col relative"
        >
            {/* IMAGE CONTAINER */}
            <div className="relative h-72 overflow-hidden bg-gray-50">
                <motion.img
                    src={product.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=500"}
                    alt={product.name}
                    animate={{ scale: isHovered ? 1.15 : 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                />

                {/* OVERLAYS & BADGES */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                    <span className="bg-white/80 backdrop-blur-xl text-[9px] px-3 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-sm text-gray-900 border border-white/50">
                        { (product.category && typeof product.category === 'object') ? product.category.name : (product.category || "Organic") }
                    </span>
                    {product.onSale && (
                        <span className="bg-yellow-400 text-yellow-900 text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-lg shadow-yellow-200">
                            Sale
                        </span>
                    )}
                    {!product.inStock && (
                        <span className="bg-red-500 text-white text-[9px] px-4 py-1.5 rounded-full font-black uppercase tracking-[0.2em] shadow-lg shadow-red-200">
                            Sold Out
                        </span>
                    )}
                </div>

                {/* QUICK ACTIONS */}
                <div className={`absolute top-6 right-6 flex flex-col gap-3 transition-all duration-500 z-10 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
                    <button
                        onClick={handleWishlist}
                        className={`w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}
                    >
                        <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                    <button
                        className="w-12 h-12 bg-white text-gray-400 rounded-2xl shadow-xl flex items-center justify-center hover:text-vegge-DEFAULT transition-all"
                    >
                        <Eye size={20} />
                    </button>
                </div>

                {/* ADD TO CART OVERLAY BUTTON */}
                <AnimatePresence>
                    {isHovered && product.inStock && !added && (
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            onClick={handleAdd}
                            className="absolute bottom-6 left-6 right-6 py-4 bg-gray-900 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all z-10"
                        >
                            <ShoppingCart size={16} /> Fast Delivery
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* ADDED FEEDBACK */}
                <AnimatePresence>
                    {added && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-vegge-dark/90 backdrop-blur flex flex-col items-center justify-center text-white z-20"
                        >
                            <motion.div 
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                className="w-16 h-16 bg-white text-vegge-dark rounded-full flex items-center justify-center mb-4"
                            >
                                <Check size={32} strokeWidth={4} />
                            </motion.div>
                            <p className="font-black uppercase tracking-[0.3em] text-[10px]">Added to Box</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* PRODUCT INFO */}
            <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="font-black text-2xl text-gray-900 group-hover:text-vegge-dark transition-colors tracking-tighter truncate leading-none py-1">
                        {product.name}
                    </h3>
                </div>

                <p className="text-gray-400 text-sm font-medium line-clamp-2 leading-relaxed h-10 mb-6 group-hover:text-gray-500 transition-colors">
                    {product.description || "Premium quality organic harvest, delivered fresh from our farms."}
                </p>

                <div className="mt-auto flex items-end justify-between">
                    <div>
                        <div className="flex items-center gap-1.5 text-yellow-400 mb-3">
                            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product.rating || 5) ? "currentColor" : "none"} strokeWidth={2.5} />)}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-gray-900 tracking-tighter">₹{product.onSale && product.discountPrice ? product.discountPrice : product.price}</span>
                            {(product.onSale && product.discountPrice) ? (
                                <span className="text-sm font-bold text-gray-300 line-through">₹{product.price}</span>
                            ) : (
                                <span className="text-sm font-bold text-gray-300 line-through">₹{product.price + 35}</span>
                            )}
                        </div>
                    </div>

                    {!product.inStock ? (
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleWaitlist(product._id); }}
                            className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${isWaiting ? 'bg-blue-100 text-blue-600 shadow-inner' : 'bg-gray-900 text-white hover:bg-black shadow-lg shadow-black/10'}`}
                        >
                            {isWaiting ? 'List Joined' : 'Notify Me'}
                        </button>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleAdd}
                            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-xl ${added ? 'bg-green-500 text-white' : 'bg-vegge-light/30 text-vegge-dark hover:bg-vegge-DEFAULT hover:text-white'}`}
                        >
                            {added ? <Check size={24} strokeWidth={3} /> : <Plus size={24} strokeWidth={3} />}
                        </motion.button>
                    )}
                </div>
            </div>

            {/* HOVER BORDER EFFECT */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-vegge-DEFAULT/20 rounded-[2.5rem] pointer-events-none transition-all duration-700" />
        </motion.div>
    )
}