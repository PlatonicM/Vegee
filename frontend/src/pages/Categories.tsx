import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { Plus, Trash2, Loader } from "lucide-react"
import { toast } from "react-toastify"
import { useAppContext } from "../context/AppContext"

export default function Categories() {

    const { token } = useAppContext()

    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const [newCategory, setNewCategory] = useState({
        name: ""
    })

    const API = "http://localhost:5000/api"


    /* FETCH */

    const fetchCategories = async () => {

        try {

            setLoading(true)

            const res = await axios.get(`${API}/categories`)

            setCategories(res.data)

        }
        catch {
            toast.error("Failed to load categories")
        }
        finally {
            setLoading(false)
        }

    }


    useEffect(() => {
        fetchCategories()
    }, [])



    /* ADD */

    const handleAddCategory = async (e: React.FormEvent) => {

        e.preventDefault()

        try {

            await axios.post(
                `${API}/categories`,
                newCategory,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            toast.success("Category created")

            setNewCategory({ name: "" })

            fetchCategories()

        }
        catch {
            toast.error("Failed to create category")
        }

    }



    /* DELETE */

    const handleDeleteCategory = async (id: string) => {

        if (!window.confirm("Delete this category?")) return

        try {

            await axios.delete(
                `${API}/categories/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )

            setCategories(prev => prev.filter(c => c._id !== id))

            toast.success("Category deleted")

        }
        catch {
            toast.error("Failed to delete category")
        }

    }



    return (

        <div className="bg-gray-50 min-h-screen pt-28 pb-16 px-4">

            <div className="max-w-5xl mx-auto">


                {/* HEADER */}

                <div className="mb-10">

                    <h1 className="text-3xl font-black text-gray-900 mb-2">
                        Categories
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Manage product categories for the store.
                    </p>

                </div>



                {/* ADD CATEGORY */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-10"
                >

                    <form
                        onSubmit={handleAddCategory}
                        className="flex flex-col sm:flex-row gap-4"
                    >

                        <input
                            type="text"
                            placeholder="Enter category name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ name: e.target.value })}
                            required
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-vegge-DEFAULT"
                        />

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-vegge-DEFAULT hover:bg-vegge-dark text-white rounded-xl text-sm font-semibold transition"
                        >

                            <Plus size={16} />
                            Add Category

                        </button>

                    </form>

                </motion.div>



                {/* CATEGORY GRID */}

                {loading ? (

                    <div className="flex justify-center py-20">

                        <Loader className="animate-spin text-vegge-DEFAULT" size={32} />

                    </div>

                )

                    : (

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                            {categories.map((cat, index) => (

                                <motion.div
                                    key={cat._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.04 }}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between shadow-sm hover:shadow-md transition"
                                >

                                    <span className="text-sm font-semibold text-gray-800 truncate">
                                        {cat.name}
                                    </span>

                                    <button
                                        onClick={() => handleDeleteCategory(cat._id)}
                                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
                                    >

                                        <Trash2 size={16} />

                                    </button>

                                </motion.div>

                            ))}

                        </div>

                    )}

            </div>

        </div>

    )

}