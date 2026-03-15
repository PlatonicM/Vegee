import { motion } from "framer-motion"

export default function Terms() {

    return (

        <div className="pt-24 min-h-screen pb-16 bg-vegge-light/30">

            <div className="max-w-4xl mx-auto px-4 lg:px-8">

                {/* HEADER */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >

                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Terms & Conditions
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Please read these terms carefully before using Vegge Shop services.
                    </p>

                </motion.div>


                {/* TERMS CONTENT */}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-10 rounded-3xl shadow border border-gray-100 space-y-8"
                >

                    {/* INTRO */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            1. Introduction
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Welcome to Vegge Shop. By accessing or using our website and
                            services, you agree to comply with and be bound by the following
                            terms and conditions. If you disagree with any part of these
                            terms, please do not use our services.
                        </p>
                    </section>


                    {/* ACCOUNT */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            2. User Accounts
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            When creating an account on Vegge Shop, you must provide accurate
                            and complete information. You are responsible for maintaining the
                            confidentiality of your account credentials and for all activities
                            that occur under your account.
                        </p>
                    </section>


                    {/* ORDERS */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            3. Orders & Payments
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            All orders placed through Vegge Shop are subject to product
                            availability. Prices may change without prior notice. Payment
                            must be completed before order processing and delivery.
                        </p>
                    </section>


                    {/* DELIVERY */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            4. Delivery Policy
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Vegge Shop strives to deliver fresh products as quickly as
                            possible. Delivery times may vary depending on location,
                            availability, and unforeseen circumstances such as weather or
                            traffic conditions.
                        </p>
                    </section>


                    {/* RETURNS */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            5. Returns & Refunds
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            If you receive damaged or incorrect products, please contact our
                            support team within 24 hours of delivery. We will arrange a
                            replacement or refund depending on the situation.
                        </p>
                    </section>


                    {/* PRIVACY */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            6. Privacy
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Your privacy is important to us. Any personal information collected
                            through Vegge Shop will be used only to provide services and
                            improve your experience on our platform.
                        </p>
                    </section>


                    {/* CHANGES */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            7. Changes to Terms
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Vegge Shop reserves the right to modify these terms at any time.
                            Updated terms will be posted on this page and will take effect
                            immediately.
                        </p>
                    </section>


                    {/* CONTACT */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            8. Contact Us
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            If you have any questions about these Terms & Conditions, please
                            contact us at <span className="text-vegge-DEFAULT font-semibold">
                                support@vegge.com
                            </span>.
                        </p>
                    </section>

                </motion.div>

            </div>

        </div>

    )
}