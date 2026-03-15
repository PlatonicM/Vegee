import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Trash2,
    ShoppingBag,
    CreditCard,
    ChevronRight,
    Plus,
    Minus,
    ArrowRight
} from "lucide-react";

import { useAppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export default function Cart() {

    const {
        cart,
        removeFromCart,
        clearCart,
        increaseQty,
        decreaseQty,
        user
    } = useAppContext()

    const navigate = useNavigate()

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    )

    const deliveryFee = subtotal > 500 ? 0 : 50
    const totalAmount = subtotal + deliveryFee


    const handleCheckout = () => {
        if (!user) {
            toast.error("Please login first")
            return
        }
        navigate("/checkout")
    }


    /* EMPTY CART */

    if (cart.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 pt-16 p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 text-center max-w-md w-full"
                >
                    <div className="w-24 h-24 bg-vegge-light/30 text-vegge-DEFAULT rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShoppingBag size={48} />
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Your Cart is Empty</h2>
                    <p className="text-gray-500 font-bold mb-10 leading-relaxed">Looks like you haven't added any fresh vegetables yet. Let's find something delicious for you!</p>
                    <button
                        onClick={() => navigate("/shop")}
                        className="w-full bg-vegge-dark text-white py-5 rounded-3xl font-black text-xl transition hover:bg-vegge-DEFAULT shadow-2xl active:scale-95 flex items-center justify-center gap-3"
                    >
                        Browse Shop <ArrowRight size={24} />
                    </button>
                    <button 
                        onClick={() => navigate("/")}
                        className="mt-6 text-sm font-bold text-gray-400 hover:text-vegge-DEFAULT transition"
                    >
                        Back to Home
                    </button>
                </motion.div>
            </div>
        )
    }

    /* MAIN PAGE */
    return (
        <div className="min-h-screen pt-24 pb-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h1 className="text-5xl font-black text-gray-900 tracking-tighter mb-2">My Cart</h1>
                        <p className="text-gray-500 font-bold flex items-center gap-2">
                           <ShoppingBag size={16} className="text-vegge-DEFAULT" /> You have {cart.length} unique items in your bag
                        </p>
                    </div>
                    <button onClick={clearCart} className="text-sm font-black text-red-500 hover:text-red-600 transition flex items-center gap-2 uppercase tracking-widest bg-red-50 px-4 py-2 rounded-xl border border-red-100">
                        <Trash2 size={16} /> Clear All
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {cart.map(item => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-wrap items-center justify-between group hover:shadow-md transition"
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden border border-gray-50 flex-shrink-0 bg-gray-50 shadow-inner">
                                            <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt={item.name} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-gray-900 mb-1">{item.name}</h3>
                                            <div className="flex items-center gap-3">
                                                <p className="text-sm font-black text-vegge-dark bg-vegge-light/30 px-3 py-1 rounded-full">₹{item.price} / unit</p>
                                                {item.stock && item.stock < 10 && (
                                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest animate-pulse">Only {item.stock} left!</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6 sm:gap-10">
                                        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100 shadow-inner">
                                            <button 
                                                onClick={() => decreaseQty(item._id)} 
                                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 hover:bg-red-50 hover:text-red-500 transition active:scale-90"
                                            >
                                                <Minus size={18} strokeWidth={3} />
                                            </button>
                                            <span className="font-black text-xl w-6 text-center text-gray-900">{item.quantity}</span>
                                            <button 
                                                onClick={() => increaseQty(item._id)} 
                                                disabled={item.stock ? item.quantity >= item.stock : false}
                                                className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-gray-500 hover:bg-green-50 hover:text-green-500 transition active:scale-90 disabled:opacity-30"
                                            >
                                                <Plus size={18} strokeWidth={3} />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-black text-3xl text-vegge-dark tracking-tighter">₹{item.price * item.quantity}</p>
                                            <button onClick={() => removeFromCart(item._id)} className="text-[10px] font-black text-red-500 hover:underline mt-1 uppercase tracking-widest p-1">Remove</button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        <div className="pt-6">
                             <button 
                                onClick={() => navigate("/shop")} 
                                className="text-sm font-black text-gray-400 flex items-center gap-2 hover:text-vegge-DEFAULT transition bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100"
                            >
                                <ChevronRight size={18} className="rotate-180" /> Continue Shopping
                             </button>
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="lg:col-span-1 h-fit sticky top-28">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-vegge-light/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            
                            <h3 className="text-2xl font-black text-gray-900 mb-8 flex gap-3 items-center">
                                <CreditCard className="text-vegge-DEFAULT" /> Order Summary
                            </h3>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between text-gray-500 font-bold">
                                    <span>Subtotal</span>
                                    <span className="text-gray-900">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-bold">
                                    <span>Delivery Fee</span>
                                    <span className={deliveryFee === 0 ? "text-green-500" : "text-gray-900"}>
                                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                                    </span>
                                </div>
                                
                                {subtotal < 500 && (
                                    <div className="bg-vegge-light/30 border border-vegge-light p-4 rounded-2xl text-[11px] font-black text-vegge-dark uppercase tracking-wider flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-vegge-DEFAULT text-white flex items-center justify-center shrink-0">🚚</div>
                                        Add ₹{500 - subtotal} for FREE delivery
                                    </div>
                                )}

                                <div className="border-t border-dashed border-gray-200 pt-8 flex justify-between items-end">
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">Total Amount</p>
                                        <p className="text-5xl font-black text-gray-900 tracking-tighter leading-none">₹{totalAmount}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Saved ₹{deliveryFee === 0 ? "50" : "0"}</p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-vegge-dark hover:bg-vegge-DEFAULT text-white py-6 rounded-[2.5rem] flex items-center justify-center gap-3 font-black text-2xl shadow-2xl transition active:scale-95 group"
                            >
                                Checkout
                                <ChevronRight size={28} className="group-hover:translate-x-1 transition" strokeWidth={3} />
                            </button>

                            <div className="flex items-center justify-center gap-4 mt-8">
                                <img src="https://img.icons8.com/color/48/visa.png" className="h-6 grayscale opacity-50 transition hover:grayscale-0 hover:opacity-100" />
                                <img src="https://img.icons8.com/color/48/mastercard.png" className="h-6 grayscale opacity-50 transition hover:grayscale-0 hover:opacity-100" />
                                <img src="https://img.icons8.com/color/48/google-pay.png" className="h-6 grayscale opacity-50 transition hover:grayscale-0 hover:opacity-100" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}