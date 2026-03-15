import { useLocation, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { CheckCircle, Download, ShoppingBag, ArrowRight } from "lucide-react"
import jsPDF from "jspdf"
import { useAppContext } from "../context/AppContext"

export default function OrderSuccess() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const { user } = useAppContext()
    const order = state?.order

    const generateInvoice = () => {
        if (!order) return

        const doc = new jsPDF()
        doc.setFontSize(22)
        doc.text("VEGEE INVOICE", 105, 20, { align: "center" })

        doc.setFontSize(12)
        doc.setTextColor(100)
        doc.text(`Order ID: ${order._id}`, 20, 40)
        doc.text(`Customer Name: ${user?.name || "Customer"}`, 20, 50)
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 20, 60)
        doc.text(`Payment: ${order.paymentMethod} (${order.paymentStatus})`, 20, 70)
        doc.text(`Address: ${order.shippingAddress}`, 20, 80)

        // Table Header
        doc.setFontSize(14)
        doc.setTextColor(0)
        doc.text("Items", 20, 100)
        doc.text("Qty", 120, 100)
        doc.text("Price", 140, 100)
        doc.text("Total", 170, 100)
        doc.line(20, 102, 190, 102)

        let y = 110
        doc.setFontSize(12)
        order.products?.forEach((item: any) => {
            const productName = item.product?.name || item.name || "Item";
            doc.text(productName, 20, y)
            doc.text(item.quantity?.toString() || "1", 120, y)
            doc.text(`₹${item.price?.toString() || "0"}`, 140, y)
            doc.text(`₹${(item.price * item.quantity)?.toString() || "0"}`, 170, y)
            y += 10
        })

        doc.line(20, y, 190, y)
        y += 15
        doc.setFontSize(16)
        doc.text(`Grand Total: ₹${order.totalAmount || 0}`, 20, y)

        doc.save(`Vegee_Invoice_${order._id?.slice(-8) || "Order"}.pdf`)
    }

    if (!order) {
        return (
            <div className="pt-32 text-center min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100 max-w-md w-full">
                    <ShoppingBag size={56} className="mx-auto text-gray-200 mb-6" />
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">No order found</h2>
                    <p className="text-gray-500 font-bold mb-8">It seems like you haven't placed any order recently or the order data is missing.</p>
                    <button 
                        onClick={() => navigate("/shop")} 
                        className="w-full bg-vegge-dark text-white px-8 py-4 rounded-3xl font-black hover:bg-vegge-DEFAULT transition shadow-lg flex items-center justify-center gap-2"
                    >
                        Go Shopping <ArrowRight size={20} />
                    </button>
                    <button 
                        onClick={() => navigate("/")}
                        className="mt-6 text-sm font-bold text-gray-400 hover:text-vegge-DEFAULT transition block mx-auto"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl w-full bg-white p-10 rounded-[3rem] shadow-2xl border border-gray-100 text-center"
            >
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle size={56} />
                </div>
                
                <h1 className="text-4xl font-black text-gray-900 mb-2">Order Confirmed!</h1>
                <p className="text-gray-500 font-medium mb-10">Thank you for shopping with Vegee. Your order has been placed successfully.</p>
                
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-10 text-left">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</span>
                        <span className="font-mono font-bold text-gray-900">#{order._id.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Amount Paid</span>
                        <span className="font-black text-vegge-dark text-xl">₹{order.totalAmount}</span>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <button 
                        onClick={generateInvoice}
                        className="flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-2xl font-black transition hover:bg-black active:scale-95 shadow-lg"
                    >
                        <Download size={20} /> Invoice PDF
                    </button>
                    <button 
                        onClick={() => navigate("/shop")}
                        className="flex items-center justify-center gap-2 py-4 bg-vegge-DEFAULT text-white rounded-2xl font-black transition hover:bg-vegge-dark active:scale-95 shadow-lg"
                    >
                        Keep Shopping <ArrowRight size={20} />
                    </button>
                </div>

                <button 
                    onClick={() => navigate("/")}
                    className="mt-8 text-sm font-bold text-gray-400 hover:text-vegge-DEFAULT transition"
                >
                    Back to Home
                </button>
            </motion.div>
        </div>
    )
}
