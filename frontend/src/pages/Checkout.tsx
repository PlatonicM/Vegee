import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { CreditCard, Smartphone, Banknote, ShieldCheck, ChevronRight } from "lucide-react"
import { useAppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"

export default function Checkout() {
    const { cart, user, token, clearCart } = useAppContext()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("COD")
    const [address, setAddress] = useState("")

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const deliveryFee = subtotal > 500 ? 0 : 50
    const totalAmount = subtotal + deliveryFee

    const handlePlaceOrder = async () => {
        if (!user) return toast.error("Please login first")
        if (!address) return toast.error("Please enter delivery address")

        setLoading(true)
        try {
            const orderData = {
                products: cart.map(c => ({
                    product: c._id,
                    quantity: c.quantity,
                    price: c.price
                })),
                totalAmount,
                shippingAddress: address,
                paymentMethod
            }

            const { data } = await axios.post(
                "http://localhost:5000/api/orders",
                orderData,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success("Order placed successfully!")
            clearCart()
            navigate("/order-success", { state: { order: data } })
        } catch (error) {
            toast.error("Failed to place order")
        } finally {
            setLoading(false)
        }
    }

    if (cart.length === 0) {
        return <div className="pt-32 text-center">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <button onClick={() => navigate("/shop")} className="mt-4 bg-vegge-DEFAULT text-white px-6 py-2 rounded-xl">Shop Now</button>
        </div>
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-24 min-h-screen pb-20 bg-gray-50"
        >
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl font-black text-gray-900 mb-10 text-center">Checkout</h1>
                
                <div className="grid md:grid-cols-2 gap-10">
                    {/* LEFT: Shipping & Payment */}
                    <div className="space-y-8">
                        <motion.section 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
                        >
                            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                <ShieldCheck className="text-green-500" /> Shipping Details
                            </h3>
                            <textarea
                                rows={4}
                                placeholder="Enter full delivery address with landmark..."
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition font-medium"
                            />
                        </motion.section>

                        <motion.section 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
                        >
                            <h3 className="text-xl font-black text-gray-900 mb-6">Payment Method</h3>
                            <div className="space-y-3">
                                {[
                                    { id: "COD", label: "Cash on Delivery", icon: Banknote, color: "text-green-600", bg: "bg-green-50" },
                                    { id: "UPI", label: "UPI / Scanner", icon: Smartphone, color: "text-blue-600", bg: "bg-blue-50" },
                                    { id: "Card", label: "Credit / Debit Card", icon: CreditCard, color: "text-purple-600", bg: "bg-purple-50" }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`w-full flex items-center justify-between p-5 rounded-2xl border-2 transition ${paymentMethod === method.id ? "border-vegge-DEFAULT bg-vegge-light/30" : "border-gray-50 bg-gray-50"}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl ${method.bg} ${method.color}`}>
                                                <method.icon />
                                            </div>
                                            <span className="font-bold text-gray-800">{method.label}</span>
                                        </div>
                                        {paymentMethod === method.id && <div className="w-6 h-6 rounded-full bg-vegge-DEFAULT flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-white" /></div>}
                                    </button>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="h-fit sticky top-28">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100"
                        >
                            <h3 className="text-xl font-black text-gray-900 mb-6 font-mono tracking-tighter uppercase">Price Summary</h3>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-500 font-bold">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 font-bold">
                                    <span>Delivery Fee</span>
                                    <span className={deliveryFee === 0 ? "text-green-500" : ""}>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                                </div>
                                <div className="border-t border-dashed border-gray-200 pt-4 flex justify-between text-2xl font-black text-gray-900">
                                    <span>Total</span>
                                    <span className="text-vegge-dark">₹{totalAmount}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading}
                                className="w-full py-5 bg-vegge-dark hover:bg-vegge-DEFAULT text-white rounded-3xl font-black text-xl shadow-2xl transition active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? "Placing Order..." : "Confirm & Pay"}
                                {!loading && <ChevronRight />}
                            </button>

                            <p className="text-center text-[10px] uppercase font-black tracking-widest text-gray-400 mt-6">Secure Transaction • Verified by Vegge</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
