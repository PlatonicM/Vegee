import { useEffect, useState } from "react"
import axios from "axios"
import { motion, AnimatePresence } from "framer-motion"
import {
    LayoutDashboard,
    Package,
    Users,
    ShoppingCart,
    Layers,
    Warehouse,
    Mail,
    Plus,
    Trash2,
    Edit3,
    Truck,
    Clock,
    DollarSign,
} from "lucide-react"
import { toast } from "react-toastify"
import { useAppContext } from "../context/AppContext"

export default function AdminDashboard() {
    const { token } = useAppContext()
    const [activeTab, setActiveTab] = useState("overview")
    const [stats, setStats] = useState<any>(null)
    const [orders, setOrders] = useState<any[]>([])
    const [inventory, setInventory] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [messages, setMessages] = useState<any[]>([])

    // Forms
    const [editingProduct, setEditingProduct] = useState<any>(null)
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        price: 0,
        category: "",
        image: "",
        stock: 0,
        inStock: true
    })
    const [newCategory, setNewCategory] = useState({
        name: "",
        image: ""
    })
    const [newInventory, setNewInventory] = useState({
        product: "",
        quantity: 0,
        warehouseLocation: "Nagpur"
    })

    const API = "http://localhost:5000/api"

    const fetchData = async () => {
        if (!token) return
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } }

            const [statsRes, productsRes, categoriesRes, ordersRes, inventoryRes, contactRes] = await Promise.all([
                axios.get(`${API}/admin/stats`, config),
                axios.get(`${API}/products`),
                axios.get(`${API}/categories`),
                axios.get(`${API}/orders`, config),
                axios.get(`${API}/inventory`, config),
                axios.get(`${API}/contact`, config)
            ])

            setStats(statsRes.data)
            setProducts(productsRes.data)
            setCategories(categoriesRes.data)
            setOrders(ordersRes.data)
            setInventory(inventoryRes.data)
            setMessages(contactRes.data)
        } catch (error) {
            toast.error("Failed to load data")
        }
    }

    useEffect(() => {
        if (token) {
            fetchData()
        }
    }, [token])

    // CRUD Handlers
    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/products`, newProduct, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Product added")
            setNewProduct({ name: "", description: "", price: 0, category: "", image: "", stock: 0, inStock: true })
            fetchData()
        } catch { toast.error("Error adding product") }
    }

    const handleUpdateProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.put(`${API}/products/${editingProduct._id}`, editingProduct, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Product updated")
            setEditingProduct(null)
            fetchData()
        } catch { toast.error("Error updating product") }
    }

    const handleDeleteProduct = async (id: string) => {
        if (!confirm("Delete this product?")) return
        try {
            await axios.delete(`${API}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Product deleted")
            fetchData()
        } catch { toast.error("Error deleting product") }
    }

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/categories`, newCategory, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Category added")
            setNewCategory({ name: "", image: "" })
            fetchData()
        } catch { toast.error("Error adding category") }
    }

    const handleDeleteCategory = async (id: string) => {
        if (!confirm("Delete this category?")) return
        try {
            await axios.delete(`${API}/categories/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Category deleted")
            fetchData()
        } catch { toast.error("Error deleting category") }
    }

    const handleUpdateOrderStatus = async (id: string, status: string) => {
        try {
            await axios.put(`${API}/orders/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Order status updated")
            fetchData()
        } catch { toast.error("Error updating order") }
    }

    const handleAddInventory = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axios.post(`${API}/inventory`, newInventory, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Inventory updated")
            setNewInventory({ product: "", quantity: 0, warehouseLocation: "Nagpur" })
            fetchData()
        } catch { toast.error("Error updating inventory") }
    }

    const handleUpdateContactStatus = async (id: string, status: string) => {
        try {
            await axios.put(`${API}/contact/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } })
            toast.success("Message status updated")
            fetchData()
        } catch { toast.error("Error updating message") }
    }

    // Components
    const SidebarItem = ({ id, icon: Icon, label }: { id: string, icon: any, label: string }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 ${activeTab === id
                ? "bg-vegge-DEFAULT text-white shadow-lg rounded-2xl scale-105 z-10"
                : "text-gray-500 hover:bg-vegge-light/30 hover:text-vegge-DEFAULT"}`}
        >
            <Icon size={22} />
            <span className="font-semibold">{label}</span>
        </button>
    )

    const StatCard = ({ label, value, icon: Icon, color }: any) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between"
        >
            <div>
                <p className="text-gray-500 text-sm font-medium">{label}</p>
                <h3 className="text-3xl font-black text-gray-900 mt-1">{value}</h3>
            </div>
            <div className={`w-14 h-14 rounded-2xl ${color} text-white flex items-center justify-center shadow-lg`}>
                <Icon size={24} />
            </div>
        </motion.div>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex pt-20">
            {/* SIDEBAR */}
            <aside className="w-72 bg-white border-r border-gray-100 p-6 flex flex-col gap-2 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
                <div className="mb-8 px-4">
                    <h2 className="text-2xl font-black text-vegge-dark">Admin Panel</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Management Hub</p>
                </div>

                <SidebarItem id="overview" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem id="products" icon={Package} label="Products" />
                <SidebarItem id="categories" icon={Layers} label="Categories" />
                <SidebarItem id="orders" icon={ShoppingCart} label="Orders" />
                <SidebarItem id="inventory" icon={Warehouse} label="Inventory" />
                <SidebarItem id="messages" icon={Mail} label="Messages" />

                <div className="mt-auto p-4 bg-vegge-light/30 rounded-2xl">
                    <p className="text-sm font-semibold text-vegge-dark">LoggedIn as</p>
                    <p className="text-xs text-gray-500 truncate">admin@vegge.com</p>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-8 overflow-x-hidden">
                <header className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 capitalize">{activeTab}</h1>
                        <p className="text-gray-500 font-medium">Manage your store {activeTab} in real-time.</p>
                    </div>
                    <button onClick={fetchData} className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
                        <Clock size={16} /> Refresh
                    </button>
                </header>

                <AnimatePresence mode="wait">
                    {/* OVERVIEW */}
                    {activeTab === "overview" && (
                        <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard label="Total Revenue" value={`₹${stats?.revenue || 0}`} icon={DollarSign} color="bg-green-500" />
                                <StatCard label="Orders" value={stats?.totalOrders || 0} icon={ShoppingCart} color="bg-blue-500" />
                                <StatCard label="Products" value={stats?.totalProducts || 0} icon={Package} color="bg-purple-500" />
                                <StatCard label="Customers" value={stats?.totalUsers || 0} icon={Users} color="bg-orange-500" />
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center justify-between">
                                        Recent Orders
                                        <button onClick={() => setActiveTab("orders")} className="text-sm text-vegge-DEFAULT font-bold hover:underline">View All</button>
                                    </h3>
                                    <div className="space-y-4">
                                        {stats?.recentOrders?.length > 0 ? stats.recentOrders.map((order: any) => (
                                            <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-vegge-light flex items-center justify-center text-vegge-DEFAULT font-bold">
                                                        {order.user?.name?.[0] || "G"}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{order.user?.name || "Guest"}</p>
                                                        <p className="text-xs text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "No Date"}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">₹{order.totalAmount}</p>
                                                    <p className={`text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'text-green-500' : 'text-orange-500'}`}>{order.status}</p>
                                                </div>
                                            </div>
                                        )) : <p className="text-center text-gray-500 py-8">No recent orders</p>}
                                    </div>
                                </div>

                                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
                                    <h3 className="text-xl font-black text-gray-900 mb-6">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button onClick={() => setActiveTab("products")} className="p-6 bg-vegge-light/30 rounded-3xl border border-vegge-light flex flex-col items-center gap-3 transition hover:scale-103 group">
                                            <div className="w-12 h-12 rounded-2xl bg-vegge-DEFAULT text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition">
                                                <Plus />
                                            </div>
                                            <span className="font-bold text-vegge-dark">Add Product</span>
                                        </button>
                                        <button onClick={() => setActiveTab("categories")} className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex flex-col items-center gap-3 transition hover:scale-103 group">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg group-hover:rotate-12 transition">
                                                <Layers />
                                            </div>
                                            <span className="font-bold text-blue-900">New Category</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* PRODUCTS */}
                    {activeTab === "products" && (
                        <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Form */}
                                <div className="lg:col-span-1">
                                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-28">
                                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                            {editingProduct ? <Edit3 size={20} className="text-orange-500" /> : <Plus size={20} className="text-vegge-DEFAULT" />}
                                            {editingProduct ? "Edit Product" : "Add New Product"}
                                        </h3>
                                        <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="space-y-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Product Name</label>
                                                <input required type="text" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1 font-semibold"
                                                    value={editingProduct ? editingProduct.name : newProduct.name}
                                                    onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Price (₹)</label>
                                                    <input required type="number" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1 font-bold"
                                                        value={editingProduct ? editingProduct.price : newProduct.price}
                                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, price: Number(e.target.value) }) : setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Category</label>
                                                    <select required className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1 font-bold"
                                                        value={editingProduct ? editingProduct.category?._id || editingProduct.category : newProduct.category}
                                                        onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, category: e.target.value }) : setNewProduct({ ...newProduct, category: e.target.value })}
                                                    >
                                                        <option value="">Select</option>
                                                        {categories?.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Image URL</label>
                                                <input required type="url" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1"
                                                    value={editingProduct ? editingProduct.image : newProduct.image}
                                                    onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, image: e.target.value }) : setNewProduct({ ...newProduct, image: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Description</label>
                                                <textarea required rows={3} className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1 text-sm font-medium"
                                                    value={editingProduct ? editingProduct.description : newProduct.description}
                                                    onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100">
                                                <span className="text-sm font-bold text-gray-700">In Stock</span>
                                                <input type="checkbox" className="w-5 h-5 accent-vegge-DEFAULT"
                                                    checked={editingProduct ? editingProduct.inStock : newProduct.inStock}
                                                    onChange={e => editingProduct ? setEditingProduct({ ...editingProduct, inStock: e.target.checked }) : setNewProduct({ ...newProduct, inStock: e.target.checked })}
                                                />
                                            </div>
                                            <div className="flex gap-3 pt-2">
                                                <button type="submit" className={`flex-1 py-4 rounded-2xl font-black text-white shadow-lg transition active:scale-95 ${editingProduct ? 'bg-orange-500 hover:bg-orange-600' : 'bg-vegge-DEFAULT hover:bg-vegge-dark'}`}>
                                                    {editingProduct ? "Update Product" : "Create Product"}
                                                </button>
                                                {editingProduct && (
                                                    <button onClick={() => setEditingProduct(null)} className="px-6 py-4 bg-gray-100 rounded-2xl font-bold text-gray-600 hover:bg-gray-200 transition">Cancel</button>
                                                )}
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* List */}
                                <div className="lg:col-span-2 space-y-4">
                                    {products?.map(p => (
                                        <div key={p._id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between gap-6 hover:shadow-md transition group">
                                            <div className="flex items-center gap-5">
                                                <div className="w-20 h-20 rounded-3xl overflow-hidden border border-gray-100 shrink-0 shadow-sm relative group-hover:rotate-3 transition duration-500">
                                                    <img src={p.image} className="w-full h-full object-cover" />
                                                    {!p.inStock && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-[10px] text-white font-black uppercase">Out of Stock</div>}
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-black text-gray-900 group-hover:text-vegge-DEFAULT transition">{p.name}</h4>
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <span className="text-xs font-bold text-blue-500 px-3 py-1 bg-blue-50 rounded-full">{p.category?.name || "No Category"}</span>
                                                        <span className="text-xl font-black text-vegge-dark">₹{p.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => setEditingProduct(p)} className="p-3 text-blue-500 bg-blue-50 rounded-2xl hover:bg-blue-500 hover:text-white transition">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteProduct(p._id)} className="p-3 text-red-500 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CATEGORIES */}
                    {activeTab === "categories" && (
                        <motion.div key="categories" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1">
                                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-28">
                                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Layers size={20} className="text-blue-500" /> New Category</h3>
                                        <form onSubmit={handleAddCategory} className="space-y-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Category Name</label>
                                                <input required type="text" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition mt-1 font-bold"
                                                    value={newCategory.name}
                                                    onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Icon/Image URL</label>
                                                <input required type="url" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-blue-500 outline-none transition mt-1"
                                                    value={newCategory.image}
                                                    onChange={e => setNewCategory({ ...newCategory, image: e.target.value })}
                                                />
                                            </div>
                                            <button type="submit" className="w-full py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-black text-white shadow-lg transition active:scale-95">Create Category</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {categories?.map(c => (
                                        <div key={c._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center p-2 group-hover:scale-110 transition duration-500">
                                                    <img src={c.image || "https://img.icons8.com/color/96/vegetables.png"} className="w-full h-full object-contain" />
                                                </div>
                                                <h4 className="text-xl font-black text-gray-900">{c.name}</h4>
                                            </div>
                                            <button onClick={() => handleDeleteCategory(c._id)} className="p-3 text-red-500 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 group-hover:rotate-12">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ORDERS */}
                    {activeTab === "orders" && (
                        <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                            {orders?.length === 0 ? (
                                <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-100">
                                    <ShoppingCart size={48} className="mx-auto text-gray-200 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-400">No orders found</h3>
                                </div>
                            ) : orders?.map(order => (
                                <div key={order._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="p-6 bg-gray-50 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                        order.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {order.status}
                                            </div>
                                            <p className="font-mono text-sm text-gray-400">#{order._id.slice(-8)}</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Ordered On</p>
                                                <p className="font-black text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Total</p>
                                                <p className="font-black text-vegge-dark text-xl">₹{order.totalAmount}</p>
                                            </div>
                                            <select
                                                className="px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT transition"
                                                value={order.status}
                                                onChange={e => handleUpdateOrderStatus(order._id, e.target.value)}
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-4">
                                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Package size={14} /> Items Ordered</h5>
                                                {order.products.map((item: any) => (
                                                    <div key={item._id} className="flex items-center gap-4">
                                                        <img src={item.product?.image} className="w-12 h-12 rounded-xl object-cover" />
                                                        <div>
                                                            <p className="font-bold text-gray-900">{item.product?.name}</p>
                                                            <p className="text-sm text-gray-500">{item.quantity} x ₹{item.price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="space-y-4">
                                                <h5 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2"><Truck size={14} /> Shipping Info</h5>
                                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <p className="font-bold text-gray-900">{order.user?.name}</p>
                                                    <p className="text-sm text-gray-600 mt-1">{order.shippingAddress}</p>
                                                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                                                        <span className="text-xs font-bold text-gray-400 uppercase">Payment: <span className="text-gray-900">{order.paymentMethod}</span></span>
                                                        <span className={`text-xs font-bold uppercase ${order.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>{order.paymentStatus}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* INVENTORY */}
                    {activeTab === "inventory" && (
                        <motion.div key="inventory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-1">
                                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 sticky top-28">
                                        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2"><Warehouse size={20} className="text-vegge-DEFAULT" /> Restock Items</h3>
                                        <form onSubmit={handleAddInventory} className="space-y-4">
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Product</label>
                                                <select required className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1 font-bold"
                                                    value={newInventory.product}
                                                    onChange={e => setNewInventory({ ...newInventory, product: e.target.value })}
                                                >
                                                    <option value="">Select Item</option>
                                                    {products?.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Quantity to Add</label>
                                                <input required type="number" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1 font-bold"
                                                    value={newInventory.quantity}
                                                    onChange={e => setNewInventory({ ...newInventory, quantity: Number(e.target.value) })}
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Warehouse Location</label>
                                                <input required type="text" className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-vegge-DEFAULT outline-none transition mt-1"
                                                    value={newInventory.warehouseLocation}
                                                    onChange={e => setNewInventory({ ...newInventory, warehouseLocation: e.target.value })}
                                                />
                                            </div>
                                            <button type="submit" className="w-full py-4 bg-vegge-DEFAULT hover:bg-vegge-dark rounded-2xl font-black text-white shadow-lg transition active:scale-95">Update Stock</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
                                        <table className="w-full text-left">
                                            <thead className="bg-gray-50 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                                                <tr>
                                                    <th className="px-8 py-5">Product</th>
                                                    <th className="px-8 py-5 text-center">Current Qty</th>
                                                    <th className="px-8 py-5">Location</th>
                                                    <th className="px-8 py-5">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-50">
                                                {inventory.map(inv => (
                                                    <tr key={inv._id} className="hover:bg-gray-50/50 transition duration-300">
                                                        <td className="px-8 py-5 flex items-center gap-4">
                                                            <img src={inv.product?.image} className="w-10 h-10 rounded-xl object-cover" />
                                                            <span className="font-bold text-gray-900">{inv.product?.name}</span>
                                                        </td>
                                                        <td className="px-8 py-5 text-center font-black text-lg text-vegge-DEFAULT">{inv.quantity}</td>
                                                        <td className="px-8 py-5 font-medium text-gray-500">{inv.warehouseLocation}</td>
                                                        <td className="px-8 py-5">
                                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${inv.quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                                                {inv.quantity < 10 ? 'Low Stock' : 'Stable'}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* MESSAGES */}
                    {activeTab === "messages" && (
                        <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
                            {messages.length === 0 ? (
                                <div className="bg-white p-20 rounded-[3rem] text-center border border-gray-100">
                                    <Mail size={48} className="mx-auto text-gray-200 mb-4" />
                                    <h3 className="text-xl font-bold text-gray-400">No messages yet</h3>
                                </div>
                            ) : messages.map(msg => (
                                <div key={msg._id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center font-black">
                                                {msg.name[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-gray-900 text-lg">{msg.name}</h4>
                                                <p className="text-sm text-gray-500 font-medium">{msg.email}</p>
                                            </div>
                                        </div>
                                        <select
                                            value={msg.status}
                                            onChange={e => handleUpdateContactStatus(msg._id, e.target.value)}
                                            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${msg.status === 'Replied' ? 'bg-green-100 text-green-600' :
                                                    msg.status === 'Read' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                                                }`}
                                        >
                                            <option value="New">New</option>
                                            <option value="Read">Read</option>
                                            <option value="Replied">Replied</option>
                                        </select>
                                    </div>
                                    <div className="pl-16">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{msg.subject}</p>
                                        <p className="text-gray-700 leading-relaxed font-medium">{msg.message}</p>
                                        <p className="text-[10px] text-gray-400 font-bold mt-4 uppercase tracking-tighter">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : "N/A"}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    )
}
