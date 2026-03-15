import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import AdminDashboard from './pages/AdminDashboard';

/* NEW PAGES */
import About from './pages/About';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Careers from './pages/Careers';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import Categories from './pages/Categories';
import Offers from './pages/Offers';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Waitlist from './pages/Waitlist';
import Wishlist from './pages/Wishlist';


import { AppProvider, useAppContext } from './context/AppContext';

/* ADMIN ROUTE */

function AdminRoute({ children }: { children: JSX.Element }) {
  const { user } = useAppContext();
  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return children;
}

/* MAIN LAYOUT */
function MainLayout() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-vegge-DEFAULT selection:text-white">
      <Navbar onSearch={setSearchQuery} />
      <main className="flex-grow">
        <Routes>
          {/* MAIN PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop searchQuery={searchQuery} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/wishlist" element={<Wishlist />} />



          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* INFORMATION PAGES */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/support" element={<Support />} />
          <Route path="/careers" element={<Careers />} />


          {/* LEGAL */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />


          {/* CATEGORY PAGE */}
          <Route path="/categories" element={<Categories />} />


          {/* ADMIN */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/* ROOT APP */
export default function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        theme="colored"
      />
    </AppProvider>
  );
}