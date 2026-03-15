import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Star, X, ShoppingCart, ShoppingBag, Heart, List, Search, SlidersHorizontal, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function Shop({ searchQuery: initialSearch = "" }: { searchQuery?: string }) {
    const { addToCart, toggleWishlist, toggleWaitlist, wishlist, waitlist } = useAppContext()
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([{ _id: "All", name: "All" }])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState(initialSearch)
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null)
    const [sortBy, setSortBy] = useState("Newest")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        setSearchQuery(initialSearch)
    }, [initialSearch])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/api/categories")
                setCategories([{ _id: "All", name: "All" }, ...data])
            } catch (err) {
                console.error("Failed to load categories")
            }
        }
        fetchCategories()
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const categoryParam = selectedCategory === "All" ? "" : selectedCategory
                const { data } = await axios.get(
                    `http://localhost:5000/api/products?search=${searchQuery}&category=${categoryParam}`
                )
                
                let sortedData = [...data]
                if (sortBy === "Price Low → High") sortedData.sort((a, b) => a.price - b.price)
                if (sortBy === "Price High → Low") sortedData.sort((a, b) => b.price - a.price)
                if (sortBy === "Best Rated") sortedData.sort((a, b) => (b.rating || 5) - (a.rating || 5))
                
                setProducts(sortedData)
            } catch {
                setError("Error loading products")
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [searchQuery, selectedCategory, sortBy])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.08 } }
    }

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        show: { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            transition: { 
                type: "spring", 
                damping: 20, 
                stiffness: 100 
            } 
        }
    }

    return (
        <div className="pt-24 pb-20 min-h-screen bg-white">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-8">
                
                {/* HERO/HEADER */}
                <div className="relative mb-16 rounded-[3rem] overflow-hidden bg-vegge-dark min-h-[300px] flex items-center p-8 md:p-16">
                    <div className="absolute inset-0 overflow-hidden">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-vegge-DEFAULT/20 rounded-full blur-[120px]" 
                        />
                        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px]" />
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-vegge-light text-xs font-black uppercase tracking-[0.2em] mb-6"
                        >
                            Farm to Table
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 leading-none"
                        >
                            Organic <span className="text-vegge-DEFAULT">Picks</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/60 text-lg font-medium leading-relaxed"
                        >
                            Browse our curated selection of ultra-fresh, pesticide-free vegetables and fruits harvested daily by our local partners.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 11, scale: 1 }}
                        transition={{ delay: 0.1, duration: 1 }}
                        className="hidden lg:block absolute right-16 bottom-0 w-1/3"
                    >
                        <img src="https://media.istockphoto.com/id/1222581489/photo/farmer-woman-holding-wooden-box-full-of-fresh-raw-vegetables.jpg?s=612x612&w=0&k=20&c=oqL1nl4fxvYrDCG93r0PXEe2NnARXwPT7RqXFIRSPh8=" />
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* SIDEBAR FILTERS - LARGE SCREEN */}
                    <div className="lg:w-80 shrink-0 hidden lg:block">
                        <div className="sticky top-28 space-y-12">
                            
                            {/* MODERN SEARCH */}
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input 
                                    type="text" 
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-[2rem] font-bold text-gray-900 focus:ring-4 focus:ring-vegge-light/50 outline-none transition-all placeholder:text-gray-400"
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="absolute right-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* CATEGORIES */}
                            <div>
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8 pl-4">Shop By Category</h3>
                                <div className="space-y-px">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat._id}
                                            onClick={() => setSelectedCategory(cat._id)}
                                            className={`w-full flex items-center justify-between px-6 py-5 rounded-2xl font-black transition-all group relative overflow-hidden ${
                                                selectedCategory === cat._id 
                                                ? "text-vegge-dark" 
                                                : "text-gray-400 hover:text-gray-900"
                                            }`}
                                        >
                                            {selectedCategory === cat._id && (
                                                <motion.div layoutId="activeCat" className="absolute inset-y-2 left-0 w-1.5 bg-vegge-DEFAULT rounded-full" />
                                            )}
                                            <span className="relative z-10">{cat.name}</span>
                                            <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${selectedCategory === cat._id ? "opacity-100" : ""}`}>
                                                <ArrowRight size={14} />
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* PRICE FILTERS */}
                            <div className="p-8 bg-gray-50 rounded-[2.5rem]">
                                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Price Range</h3>
                                <div className="space-y-6">
                                    <div className="flex items-end justify-between px-2">
                                        <div className="w-1/3 h-12 bg-vegge-light/30 rounded-full" />
                                        <div className="w-1/3 h-20 bg-vegge-light/50 rounded-full" />
                                        <div className="w-1/3 h-28 bg-vegge-DEFAULT rounded-full" />
                                        <div className="w-1/3 h-16 bg-vegge-light/40 rounded-full" />
                                    </div>
                                    <input type="range" min="0" max="1000" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-vegge-dark" />
                                    <div className="flex justify-between text-xs font-black text-gray-900">
                                        <span>₹0</span>
                                        <span>₹1,000+</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* MAIN LISTING */}
                    <div className="flex-1">
                        
                        {/* TOOLBAR */}
                        <div className="flex items-center justify-between mb-10 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-vegge-DEFAULT animate-pulse" />
                                <span className="text-sm font-black text-gray-900">{products.length} Products Found</span>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
                                    {["Newest", "Price Low → High", "Price High → Low", "Best Rated"].map(o => (
                                        <button 
                                            key={o}
                                            onClick={() => setSortBy(o)}
                                            className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${sortBy === o ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
                                        >
                                            {o}
                                        </button>
                                    ))}
                                </div>
                                <button 
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden p-4 bg-gray-50 rounded-2xl text-gray-900 hover:bg-gray-100 transition-colors"
                                >
                                    <SlidersHorizontal size={20} />
                                </button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                                {Array.from({ length: 9 }).map((_, i) => (
                                    <div key={i} className="space-y-6 animate-pulse">
                                        <div className="aspect-[4/5] bg-gray-50 rounded-[2.5rem]" />
                                        <div className="h-4 w-1/2 bg-gray-50 rounded-full mx-auto" />
                                        <div className="h-4 w-1/4 bg-gray-50 rounded-full mx-auto" />
                                    </div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="p-20 bg-red-50 rounded-[3rem] text-center border-2 border-dashed border-red-100">
                                <h3 className="text-2xl font-black text-red-500 mb-2">Oops!</h3>
                                <p className="text-red-400 font-bold">{error}</p>
                                <button onClick={() => window.location.reload()} className="mt-6 px-8 py-3 bg-white text-red-500 rounded-2xl font-black shadow-sm hover:shadow-md transition">Try Again</button>
                            </div>
                        ) : products.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12"
                            >
                                {products.map((product) => (
                                    <motion.div 
                                        key={product._id} 
                                        variants={itemVariants}
                                        onClick={() => setSelectedProduct(product)}
                                        className="cursor-pointer"
                                    >
                                        <ProductCard product={product} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="py-40 text-center">
                                <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <ShoppingBag size={48} className="text-gray-200" />
                                </div>
                                <h3 className="text-4xl font-black text-gray-900 tracking-tighter mb-4">No results match.</h3>
                                <p className="text-gray-500 font-bold mb-10 max-w-sm mx-auto">Try adjusting your filters or search terms to find what you're looking for.</p>
                                <button 
                                    onClick={() => {setSearchQuery(""); setSelectedCategory("All")}} 
                                    className="px-10 py-4 bg-gray-900 text-white rounded-[2rem] font-black shadow-xl hover:bg-black transition active:scale-95"
                                >
                                    Reset Discovery
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE SIDEBAR MODAL */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[110] lg:hidden"
                        />
                        <motion.div 
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed inset-y-0 right-0 w-[85%] bg-white z-[120] lg:hidden shadow-2xl p-10 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-black tracking-tighter">Filters</h2>
                                <button onClick={() => setIsSidebarOpen(false)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-12">
                                <div>
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Search</h3>
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold"
                                        placeholder="Item name..."
                                    />
                                </div>

                                <div>
                                    <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">Categories</h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat._id}
                                                onClick={() => { setSelectedCategory(cat._id); setIsSidebarOpen(false); }}
                                                className={`px-6 py-4 rounded-2xl text-left font-black transition-all ${
                                                    selectedCategory === cat._id 
                                                    ? "bg-vegge-dark text-white shadow-xl" 
                                                    : "bg-gray-50 text-gray-500"
                                                }`}
                                            >
                                                {cat.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setIsSidebarOpen(false)} className="mt-12 w-full py-5 bg-vegge-DEFAULT text-white rounded-[2rem] font-black shadow-lg">
                                Show {products.length} Results
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* PRODUCT QUICK VIEW MODAL */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-gray-900/40 backdrop-blur-xl flex items-center justify-center z-[200] p-4 lg:p-8"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 50, opacity: 0 }}
                            className="bg-white rounded-[3.5rem] max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.2)] relative flex flex-col lg:grid lg:grid-cols-2 gap-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-all z-50">
                                <X size={24} strokeWidth={3} />
                            </button>

                            {/* IMAGE SIDE */}
                            <div className="h-[40vh] lg:h-full bg-gray-50 relative overflow-hidden group">
                                <img src={selectedProduct.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={selectedProduct.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <div className="absolute bottom-8 left-8 flex gap-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden cursor-pointer hover:bg-white/40 transition">
                                            <img src={selectedProduct.image} className="w-full h-full object-cover" alt="Thumb" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CONTENT SIDE */}
                            <div className="p-10 lg:p-20 overflow-y-auto flex flex-col">
                                <div className="flex items-center justify-between mb-8">
                                    <span className="px-5 py-2 bg-vegge-light/30 text-vegge-dark text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                                        { (selectedProduct.category && typeof selectedProduct.category === 'object') ? selectedProduct.category.name : (selectedProduct.category || "Organic") }
                                    </span>
                                    <div className="flex items-center gap-1.5 text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" strokeWidth={0} />)}
                                        <span className="text-gray-400 text-xs font-black ml-2">(120 Reviews)</span>
                                    </div>
                                </div>

                                <h2 className="text-5xl lg:text-7xl font-black text-gray-900 tracking-tighter mb-6 leading-[0.9]">{selectedProduct.name}</h2>
                                <p className="text-gray-500 font-bold leading-relaxed mb-10 text-lg">{selectedProduct.description || "Fresh from the farm to your door. Sustainably grown and hand-picked for quality."}</p>

                                <div className="grid grid-cols-2 gap-8 mb-12">
                                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Price Per Unit</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-black text-vegge-dark tracking-tighter">₹{selectedProduct.price}</span>
                                            <span className="text-lg text-gray-300 line-through font-bold">₹{selectedProduct.price + 45}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex flex-col justify-center">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Inventory Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${selectedProduct.inStock ? "bg-green-500" : "bg-red-500"}`} />
                                            <span className={`font-black uppercase text-xs tracking-widest ${selectedProduct.inStock ? "text-green-600" : "text-red-600"}`}>
                                                {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex gap-4">
                                    {selectedProduct.inStock ? (
                                        <button 
                                            onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                            className="flex-1 py-6 bg-vegge-dark hover:bg-vegge-DEFAULT text-white rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 group"
                                        >
                                            <ShoppingCart className="group-hover:rotate-12 transition-transform" /> Add to Delivery
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => toggleWaitlist(selectedProduct._id)}
                                            className={`flex-1 py-6 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 ${
                                                waitlist.includes(selectedProduct._id) 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-gray-900 hover:bg-black text-white"
                                            }`}
                                        >
                                            <List /> {waitlist.includes(selectedProduct._id) ? "On Waitlist" : "Notify Me"}
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => toggleWishlist(selectedProduct._id)}
                                        className={`w-20 rounded-[2.5rem] transition-all flex items-center justify-center ${
                                            wishlist.includes(selectedProduct._id) 
                                            ? "bg-red-50 text-red-500 border border-red-100" 
                                            : "bg-gray-50 text-gray-400 border border-gray-100 hover:bg-gray-100"
                                        }`}
                                    >
                                        <Heart size={28} fill={wishlist.includes(selectedProduct._id) ? "currentColor" : "none"} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}