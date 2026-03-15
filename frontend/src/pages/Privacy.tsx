import { motion } from "framer-motion"

export default function Privacy() {

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
                        Privacy Policy
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Your privacy is important to us at Vegge Shop.
                    </p>

                </motion.div>


                {/* POLICY CONTENT */}

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
                            Vegge Shop values your privacy and is committed to protecting
                            your personal information. This policy explains how we collect,
                            use, and safeguard your data when you use our website and services.
                        </p>
                    </section>


                    {/* INFORMATION WE COLLECT */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            2. Information We Collect
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed mb-2">
                            We may collect the following information:
                        </p>

                        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                            <li>Name and contact details</li>
                            <li>Email address</li>
                            <li>Delivery address</li>
                            <li>Order history</li>
                            <li>Payment transaction details</li>
                        </ul>
                    </section>


                    {/* HOW WE USE DATA */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            3. How We Use Your Information
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Your information is used to process orders, improve our
                            services, communicate with you regarding your orders,
                            and provide customer support.
                        </p>
                    </section>


                    {/* DATA PROTECTION */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            4. Data Protection
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            We implement security measures to protect your personal
                            information from unauthorized access, alteration, or
                            disclosure. Your data is stored securely and only used
                            for legitimate purposes.
                        </p>
                    </section>


                    {/* COOKIES */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            5. Cookies
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Vegge Shop may use cookies to enhance user experience,
                            analyze website traffic, and improve our services.
                            You can disable cookies in your browser settings if
                            you prefer.
                        </p>
                    </section>


                    {/* THIRD PARTY */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            6. Third-Party Services
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            We may use trusted third-party services for payment
                            processing, delivery tracking, and analytics. These
                            providers are required to protect your information
                            according to applicable privacy laws.
                        </p>
                    </section>


                    {/* USER RIGHTS */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            7. Your Rights
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            You have the right to request access, correction, or
                            deletion of your personal data. Please contact us if
                            you wish to exercise these rights.
                        </p>
                    </section>


                    {/* POLICY CHANGES */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            8. Changes to This Policy
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Vegge Shop may update this Privacy Policy from time
                            to time. Changes will be posted on this page with
                            updated revision dates.
                        </p>
                    </section>


                    {/* CONTACT */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            9. Contact Us
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            If you have any questions about this Privacy Policy,
                            you can contact us at:
                            <span className="text-vegge-DEFAULT font-semibold ml-1">
                                support@vegge.com
                            </span>
                        </p>
                    </section>

                </motion.div>

            </div>

        </div>

    )
}