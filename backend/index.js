require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Product = require("./models/Product")
const User = require("./models/User")
const Order = require("./models/Order")
const Inventory = require("./models/Inventory")
const Category = require("./models/Category")
const Contact = require("./models/Contact")
const Career = require("./models/Career")

const { auth, isAdmin } = require("./middleware/auth")

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/vegge"

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err))


/* =================================================
AUTH ROUTES
================================================= */

app.post("/api/auth/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        const exists = await User.findOne({ email })
        if (exists) return res.status(400).json({ error: "Email already exists" })

        const hash = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password: hash,
            role: role || "customer"
        })
        await user.save()

        const token = jwt.sign(
            { _id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "7d" }
        )

        res.status(201).json({
            user: { _id: user._id, name, email, role: user.role },
            token
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/api/auth/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ error: "Invalid credentials" })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).json({ error: "Invalid credentials" })

        const token = jwt.sign(
            { _id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET || "secret123",
            { expiresIn: "7d" }
        )

        res.json({
            user: { _id: user._id, name: user.name, email: user.email, role: user.role },
            token
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
CATEGORY CRUD
================================================= */

app.get("/api/categories", async (req, res) => {
    try {
        const categories = await Category.find().sort("name")
        res.json(categories)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/categories/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.json(category)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/api/categories", auth, isAdmin, async (req, res) => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.status(201).json(category)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/categories/:id", auth, isAdmin, async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(category)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.delete("/api/categories/:id", auth, isAdmin, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({ message: "Category deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
PRODUCT CRUD
================================================= */

app.get("/api/products", async (req, res) => {
    try {
        const { search, category } = req.query
        let query = {}
        if (search) query.name = { $regex: search, $options: "i" }
        if (category && category !== "All") query.category = category

        const products = await Product.find(query).populate("category")
        res.json(products)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category")
        res.json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/api/products", auth, isAdmin, async (req, res) => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/products/:id", auth, isAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(product)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.delete("/api/products/:id", auth, isAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.json({ message: "Product deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
INVENTORY CRUD
================================================= */

app.get("/api/inventory", auth, isAdmin, async (req, res) => {
    try {
        const items = await Inventory.find().populate("product").populate("lastUpdatedBy", "name")
        res.json(items)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/api/inventory", auth, isAdmin, async (req, res) => {
    try {
        const { product, quantity, warehouseLocation } = req.body
        let inv = await Inventory.findOne({ product, warehouseLocation })

        if (inv) {
            inv.quantity += parseInt(quantity)
            inv.lastUpdatedBy = req.user._id
            await inv.save()
        } else {
            inv = new Inventory({
                product,
                quantity,
                warehouseLocation,
                lastUpdatedBy: req.user._id
            })
            await inv.save()
        }

        // Update product total stock
        const totalStock = await Inventory.aggregate([
            { $match: { product: new mongoose.Types.ObjectId(product) } },
            { $group: { _id: "$product", total: { $sum: "$quantity" } } }
        ])

        await Product.findByIdAndUpdate(product, { 
            stock: totalStock[0]?.total || 0,
            inStock: (totalStock[0]?.total || 0) > 0
        })

        res.json(inv)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/inventory/:id", auth, isAdmin, async (req, res) => {
    try {
        const inv = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true })
        
        // Update product total stock
        const totalStock = await Inventory.aggregate([
            { $match: { product: inv.product } },
            { $group: { _id: "$product", total: { $sum: "$quantity" } } }
        ])

        await Product.findByIdAndUpdate(inv.product, { 
            stock: totalStock[0]?.total || 0,
            inStock: (totalStock[0]?.total || 0) > 0
        })

        res.json(inv)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.delete("/api/inventory/:id", auth, isAdmin, async (req, res) => {
    try {
        const inv = await Inventory.findById(req.params.id)
        const productId = inv.product
        await Inventory.findByIdAndDelete(req.params.id)

        // Update product total stock
        const totalStock = await Inventory.aggregate([
            { $match: { product: productId } },
            { $group: { _id: "$product", total: { $sum: "$quantity" } } }
        ])

        await Product.findByIdAndUpdate(productId, { 
            stock: totalStock[0]?.total || 0,
            inStock: (totalStock[0]?.total || 0) > 0
        })

        res.json({ message: "Inventory deleted" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
ORDERS
================================================= */

app.post("/api/orders", auth, async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress, paymentMethod } = req.body

        const order = new Order({
            user: req.user._id,
            products,
            totalAmount,
            shippingAddress,
            paymentMethod,
            paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid'
        })

        await order.save()

        // Auto Decrement Inventory
        for (const item of products) {
            // Find inventory for this product and decrement
            const inv = await Inventory.findOne({ product: item.product })
            if (inv) {
                inv.quantity -= item.quantity
                await inv.save()
            }
            
            // Update product stock
            await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
            const updatedProduct = await Product.findById(item.product)
            if (updatedProduct.stock <= 0) {
                updatedProduct.inStock = false
                await updatedProduct.save()
            }
        }

        res.status(201).json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/orders", auth, async (req, res) => {
    try {
        const query = req.user.role === "admin" ? {} : { user: req.user._id }
        const orders = await Order.find(query)
            .populate("products.product")
            .populate("user", "name email")
            .sort("-createdAt")
        res.json(orders)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/orders/:id", auth, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("products.product")
            .populate("user", "name email")
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/orders/:id/status", auth, isAdmin, async (req, res) => {
    try {
        const { status, lat, lng } = req.body
        const order = await Order.findById(req.params.id)

        if (!order) return res.status(404).json({ error: "Order not found" })

        if (status === 'Cancelled' && order.status !== 'Cancelled') {
            // Auto Increment Inventory on cancellation
            for (const item of order.products) {
                const inv = await Inventory.findOne({ product: item.product })
                if (inv) {
                    inv.quantity += item.quantity
                    await inv.save()
                }
                await Product.findByIdAndUpdate(item.product, { 
                    $inc: { stock: item.quantity },
                    inStock: true
                })
            }
        }

        if (status) order.status = status
        if (lat && lng) order.liveLocation = { lat, lng }

        await order.save()
        res.json(order)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
USER ACTIONS (WISHLIST, WAITLIST)
================================================= */

app.post("/api/user/wishlist/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const productId = req.params.id
        
        if (user.wishlist.includes(productId)) {
            user.wishlist = user.wishlist.filter(id => id.toString() !== productId)
        } else {
            user.wishlist.push(productId)
        }
        
        await user.save()
        res.json(user.wishlist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/user/wishlist", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist")
        res.json(user.wishlist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.post("/api/user/waitlist/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const productId = req.params.id
        
        if (user.waitlist.includes(productId)) {
            user.waitlist = user.waitlist.filter(id => id.toString() !== productId)
        } else {
            user.waitlist.push(productId)
        }
        
        await user.save()
        res.json(user.waitlist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/user/waitlist", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("waitlist")
        res.json(user.waitlist)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
CONTACT ROUTES
================================================= */

app.post("/api/contact", async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        res.status(201).json({ message: "Message sent successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/contact", auth, isAdmin, async (req, res) => {
    try {
        const messages = await Contact.find().sort("-createdAt")
        res.json(messages)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/contact/:id", auth, isAdmin, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(contact)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
CAREERS
================================================= */

app.post("/api/careers/apply", async (req, res) => {
    try {
        const application = new Career(req.body)
        await application.save()
        res.status(201).json({ message: "Application submitted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/careers", auth, isAdmin, async (req, res) => {
    try {
        const applications = await Career.find().sort("-createdAt")
        res.json(applications)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/careers/:id", auth, isAdmin, async (req, res) => {
    try {
        const application = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(application)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
CONTACT / SUPPORT ROUTES
================================================= */

app.post("/api/contact", async (req, res) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        res.status(201).json(contact)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.get("/api/contact", auth, isAdmin, async (req, res) => {
    try {
        const messages = await Contact.find().sort("-createdAt")
        res.json(messages)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.put("/api/contact/:id", auth, isAdmin, async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(contact)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
ADMIN DASHBOARD STATS
================================================= */

app.get("/api/admin/stats", auth, isAdmin, async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments()
        const totalOrders = await Order.countDocuments()
        const totalUsers = await User.countDocuments()
        const totalRevenue = await Order.aggregate([
            { $match: { paymentStatus: 'Paid' } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ])
        
        const recentOrders = await Order.find().sort("-createdAt").limit(5).populate("user", "name")
        
        res.json({
            totalProducts,
            totalOrders,
            totalUsers,
            revenue: totalRevenue[0]?.total || 0,
            recentOrders
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})


/* =================================================
DATABASE SEED
================================================= */

app.post("/api/seed", async (req, res) => {
    try {
        await Category.deleteMany()
        const categories = await Category.insertMany([
            { name: "Vegetable", image: "https://images.unsplash.com/photo-1566385101042-1a000c126ec7" },
            { name: "Fruit", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b" },
            { name: "Leafy", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999" },
            { name: "Root", image: "https://images.unsplash.com/photo-1518977676601-b53f02ac6d31" },
            { name: "Spice", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d" }
        ])

        await Product.deleteMany()
        const products = await Product.insertMany([
            {
                name: "Fresh Tomatoes",
                description: "Organic red tomatoes from local farms.",
                price: 40,
                category: categories[0]._id,
                image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
                stock: 100
            },
            {
                name: "Organic Bananas",
                description: "Sweet and ripe yellow bananas.",
                price: 60,
                category: categories[1]._id,
                image: "https://images.unsplash.com/photo-1571501679680-de32f1e7aad4",
                stock: 150
            },
            {
                name: "Spinach",
                description: "Fresh green leafy spinach.",
                price: 30,
                category: categories[2]._id,
                image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
                stock: 80
            },
            {
                name: "Carrots",
                description: "Crunchy orange root carrots.",
                price: 50,
                category: categories[3]._id,
                image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37",
                stock: 120
            },
            {
                name: "Mega Veggie Combo",
                description: "A large assortment of fresh seasonal vegetables.",
                price: 500,
                discountPrice: 399,
                onSale: true,
                category: categories[0]._id,
                image: "https://plus.unsplash.com/premium_photo-1663100876161-d254f1266646",
                stock: 50
            },
            {
                name: "Exotic Fruit Basket",
                description: "Grapes, Kiwi, and Dragon Fruit selection.",
                price: 800,
                discountPrice: 649,
                onSale: true,
                category: categories[1]._id,
                image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf",
                stock: 30
            }
        ])

        await User.deleteMany()
        const hash = await bcrypt.hash("admin123", 10)
        const admin = await User.create({
            name: "Admin",
            email: "admin@vegge.com",
            password: hash,
            role: "admin"
        })

        await Inventory.deleteMany()
        for (const p of products) {
            await Inventory.create({
                product: p._id,
                quantity: p.stock,
                warehouseLocation: "Nagpur",
                lastUpdatedBy: admin._id
            })
        }

        // Add a specialized offer product
        await Product.create({
            name: "Mega Veggie Combo",
            description: "A mix of everything fresh from our farm. Limited time offer!",
            price: 500,
            discountPrice: 350,
            onSale: true,
            category: categories[0]._id,
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
            stock: 50
        })

        res.json({ message: "Database Seeded Successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})