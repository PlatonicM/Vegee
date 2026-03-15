import { Search, ShoppingCart, User as UserIcon, LogOut, LayoutDashboard, Menu, Heart, List } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

export default function Navbar({ onSearch }: { onSearch: (s: string) => void }) {

    const { user, cart, logout, wishlist, waitlist } = useAppContext()
    const [query, setQuery] = useState("")
    const [mobileMenu, setMobileMenu] = useState(false)
    const navigate = useNavigate()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (!query.trim()) return
        onSearch(query)
        navigate("/shop")
    }

    const handleLogout = () => {
        logout()
        navigate("/")
    }

    const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (

        <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-md">

            <div className="max-w-[1400px] mx-auto px-6">

                <div className="flex items-center justify-between h-20">

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 text-2xl font-extrabold text-vegge-dark hover:scale-105 transition-transform"
                    >
                        Vegee
                    </Link>

                    {/* NAV LINKS */}
                    <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold">

                        {[
                            { name: "Home", path: "/" },
                            { name: "Products", path: "/shop" },
                            { name: "Offers", path: "/offers" },
                            // { name: "Support", path: "/support" },
                            // { name: "Careers", path: "/careers" },
                            { name: "About", path: "/about" }
                        ].map((link) => (

                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative pb-1 transition group
                                    ${isActive ? "text-vegge-DEFAULT" : "text-gray-700 hover:text-vegge-DEFAULT"}`
                                }
                            >

                                {({ isActive }) => (
                                    <>
                                        {link.name}

                                        {/* ACTIVE UNDERLINE */}
                                        <span
                                            className={`absolute left-0 -bottom-1 h-[2px] bg-vegge-DEFAULT transition-all duration-300
                                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                                        ></span>
                                    </>
                                )}

                            </NavLink>

                        ))}

                    </div>

                    {/* SEARCH */}
                    <div className="hidden md:flex flex-1 max-w-sm mx-6">

                        <form onSubmit={handleSearch} className="relative w-full">

                            <input
                                type="text"
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-vegge-DEFAULT outline-none bg-gray-50 focus:bg-white text-sm"
                            />

                            <Search className="absolute left-4 top-2.5 h-4 w-4 text-gray-400" />

                        </form>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-5">

                        {/* WISHLIST */}
                        <Link to="/wishlist" className="relative text-gray-500 hover:text-red-500 transition scale-110 active:scale-95">
                            <Heart className={`h-6 w-6 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                            {wishlist.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                    {wishlist.length}
                                </span>
                            )}
                        </Link>

                        {/* WAITLIST */}
                        <Link to="/waitlist" className="relative text-gray-500 hover:text-blue-500 transition scale-110 active:scale-95">
                            <List className="h-6 w-6" />
                            {waitlist.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-blue-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                    {waitlist.length}
                                </span>
                            )}
                        </Link>

                        {/* CART */}
                        <Link to="/cart" className="relative text-gray-700 hover:text-vegge-DEFAULT transition scale-110 active:scale-95">
                            <ShoppingCart className="h-6 w-6" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-vegge-dark text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {/* USER */}
                        {user ? (

                            <div className="flex items-center gap-4">

                                <div className="flex items-center gap-2">

                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user.name}&background=16a34a&color=fff`}
                                        alt={user.name}
                                        loading="lazy"
                                        className="h-9 w-9 rounded-full"
                                    />

                                    <div className="hidden sm:flex flex-col leading-tight">

                                        <span className="text-sm font-semibold">
                                            {user.name}
                                        </span>

                                        <span className="text-xs text-vegge-DEFAULT capitalize">
                                            {user.role}
                                        </span>

                                    </div>

                                </div>

                                {user.role === "admin" && (
                                    <Link
                                        to="/admin"
                                        className="text-gray-600 hover:text-vegge-DEFAULT transition"
                                    >
                                        <LayoutDashboard className="h-6 w-6" />
                                    </Link>
                                )}

                                <button
                                    onClick={handleLogout}
                                    className="text-gray-600 hover:text-red-500 transition"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>

                            </div>

                        ) : (

                            <Link
                                to="/login"
                                className="flex items-center gap-2 bg-vegge-DEFAULT hover:bg-vegge-dark text-white px-5 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
                            >
                                <UserIcon className="h-4 w-4" />
                                Login
                            </Link>

                        )}

                        {/* MOBILE MENU BUTTON */}
                        <button
                            className="lg:hidden"
                            onClick={() => setMobileMenu(!mobileMenu)}
                        >
                            <Menu className="h-6 w-6 text-gray-700" />
                        </button>

                    </div>

                </div>

                {/* MOBILE MENU */}
                {mobileMenu && (

                    <div className="lg:hidden py-4 border-t border-gray-200 flex flex-col gap-4 text-sm font-medium">

                        <Link to="/" onClick={() => setMobileMenu(false)}>Home</Link>
                        <Link to="/shop" onClick={() => setMobileMenu(false)}>Shop</Link>
                        <Link to="/offers" onClick={() => setMobileMenu(false)}>Offers</Link>
                        <Link to="/contact" onClick={() => setMobileMenu(false)}>Contact</Link>
                        <Link to="/about" onClick={() => setMobileMenu(false)}>About</Link>

                    </div>

                )}

            </div>

        </nav>

    )

}