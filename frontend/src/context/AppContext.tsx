import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from "react"
import axios from "axios"
import { toast } from "react-toastify"

type User = {
    _id: string
    name: string
    email: string
    role: string
}

type Product = {
    _id: string
    name: string
    price: number
    image: string
    stock?: number
}

export type CartItem = Product & {
    quantity: number
}

interface AppContextType {
    user: User | null
    token: string | null
    login: (user: User, token: string) => void
    logout: () => void
    
    cart: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (id: string) => void
    increaseQty: (id: string) => void
    decreaseQty: (id: string) => void
    updateQty: (id: string, qty: number) => void
    clearCart: () => void
    cartItems: number
    cartTotal: number

    wishlist: string[]
    toggleWishlist: (productId: string) => void
    waitlist: string[]
    toggleWaitlist: (productId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [cart, setCart] = useState<CartItem[]>([])
    const [wishlist, setWishlist] = useState<string[]>([])
    const [waitlist, setWaitlist] = useState<string[]>([])

    const API = "http://localhost:5000/api"

    useEffect(() => {
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")
        const savedCart = localStorage.getItem("cart")
        if (savedToken && savedUser) {
            setToken(savedToken)
            setUser(JSON.parse(savedUser))
        }
        if (savedCart) setCart(JSON.parse(savedCart))
    }, [])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    const login = (newUser: User, newToken: string) => {
        setUser(newUser)
        setToken(newToken)
        localStorage.setItem("user", JSON.stringify(newUser))
        localStorage.setItem("token", newToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setWishlist([])
        setWaitlist([])
    }

    // CART
    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(i => i._id === product._id)
            if (existing) {
                return prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
        toast.success(`${product.name} added to cart!`)
    }

    const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item._id !== id))
    const increaseQty = (id: string) => setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item))
    const decreaseQty = (id: string) => setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0))
    const updateQty = (id: string, qty: number) => {
        if (qty <= 0) return removeFromCart(id)
        setCart(prev => prev.map(item => item._id === id ? { ...item, quantity: qty } : item))
    }
    const clearCart = () => setCart([])

    const cartItems = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart])
    const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart])

    // WISHLIST & WAITLIST
    const toggleWishlist = async (productId: string) => {
        if (!token) return toast.error("Please login first")
        try {
            const { data } = await axios.post(`${API}/user/wishlist/${productId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            setWishlist(data)
            toast.success("Wishlist updated")
        } catch { toast.error("Failed to update wishlist") }
    }

    const toggleWaitlist = async (productId: string) => {
        if (!token) return toast.error("Please login first")
        try {
            const { data } = await axios.post(`${API}/user/waitlist/${productId}`, {}, { headers: { Authorization: `Bearer ${token}` } })
            setWaitlist(data)
            toast.success("Waitlist updated")
        } catch { toast.error("Failed to update waitlist") }
    }

    return (
        <AppContext.Provider value={{
            user, token, login, logout,
            cart, addToCart, removeFromCart, increaseQty, decreaseQty, updateQty, clearCart, cartItems, cartTotal,
            wishlist, toggleWishlist, waitlist, toggleWaitlist
        }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) throw new Error("useAppContext must be used within AppProvider")
    return context
}