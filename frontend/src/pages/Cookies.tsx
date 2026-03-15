import { motion } from "framer-motion"

export default function Cookies() {

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
                        Cookie Policy
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Learn how Vegge Shop uses cookies to improve your browsing experience.
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
                            1. What Are Cookies?
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Cookies are small text files stored on your device when
                            you visit a website. They help websites remember your
                            preferences and improve your browsing experience.
                        </p>
                    </section>


                    {/* HOW WE USE COOKIES */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            2. How We Use Cookies
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Vegge Shop uses cookies to enhance website functionality,
                            improve performance, and personalize your experience.
                        </p>

                        <ul className="list-disc pl-5 mt-3 text-gray-600 text-sm space-y-1">
                            <li>Remember user login sessions</li>
                            <li>Store cart items</li>
                            <li>Improve website performance</li>
                            <li>Analyze user behavior and traffic</li>
                        </ul>

                    </section>


                    {/* TYPES OF COOKIES */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            3. Types of Cookies We Use
                        </h2>

                        <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">

                            <li>
                                <strong>Essential Cookies:</strong> Required for
                                website functionality such as login and checkout.
                            </li>

                            <li>
                                <strong>Performance Cookies:</strong> Help us
                                analyze how visitors interact with our website.
                            </li>

                            <li>
                                <strong>Functional Cookies:</strong> Remember your
                                preferences such as language and settings.
                            </li>

                            <li>
                                <strong>Analytics Cookies:</strong> Help us improve
                                the website using tools like analytics platforms.
                            </li>

                        </ul>

                    </section>


                    {/* THIRD PARTY */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            4. Third-Party Cookies
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Some cookies may be placed by third-party services such
                            as payment gateways, analytics providers, or delivery
                            tracking tools used by Vegge Shop.
                        </p>

                    </section>


                    {/* CONTROL */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            5. Managing Cookies
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            You can control or disable cookies through your browser
                            settings. However, disabling cookies may affect certain
                            features of the Vegge Shop website.
                        </p>

                    </section>


                    {/* CHANGES */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            6. Updates to This Policy
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            Vegge Shop may update this Cookie Policy from time to
                            time. Any changes will be posted on this page.
                        </p>

                    </section>


                    {/* CONTACT */}

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">
                            7. Contact Us
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            If you have questions about our Cookie Policy, please
                            contact us at
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