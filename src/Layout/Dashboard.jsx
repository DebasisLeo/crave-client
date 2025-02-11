import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    return (
        <div className="flex min-h-screen">
            {/* Dashboard Sidebar */}
            <div className="w-64 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg z-10 transition-all duration-300 ease-in-out">
                <ul className="menu p-4 space-y-4">
                    {isAdmin ? (
                        <>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/adminHome" className="flex items-center gap-2">
                                    <FaHome />
                                    Admin Home
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/addItems" className="flex items-center gap-2">
                                    <FaUtensils />
                                    Add Items
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/manageItems" className="flex items-center gap-2">
                                    <FaList />
                                    Manage Items
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/bookings" className="flex items-center gap-2">
                                    <FaBook />
                                    Manage Bookings
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/users" className="flex items-center gap-2">
                                    <FaUsers />
                                    All Users
                                </NavLink>
                            </motion.li>
                        </>
                    ) : (
                        <>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/userHome" className="flex items-center gap-2">
                                    <FaHome />
                                    User Home
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/history" className="flex items-center gap-2">
                                    <FaCalendar />
                                    Not History
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/cart" className="flex items-center gap-2">
                                    <FaShoppingCart />
                                    My Cart ({cart.length})
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/review" className="flex items-center gap-2">
                                    <FaAd />
                                    Add a Review
                                </NavLink>
                            </motion.li>
                            <motion.li
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <NavLink to="/dashboard/paymentHistory" className="flex items-center gap-2">
                                    <FaList />
                                    Real Payment History
                                </NavLink>
                            </motion.li>
                        </>
                    )}

                    {/* Shared Navigation Links */}
                    <div className="divider my-6"></div>
                    <motion.li
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NavLink to="/" className="flex items-center gap-2">
                            <FaHome />
                            Home
                        </NavLink>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NavLink to="/order/salad" className="flex items-center gap-2">
                            <FaSearch />
                            Menu
                        </NavLink>
                    </motion.li>
                    <motion.li
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <NavLink to="/order/contact" className="flex items-center gap-2">
                            <FaEnvelope />
                            Contact
                        </NavLink>
                    </motion.li>
                </ul>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 p-8 overflow-y-auto bg-gray-100 transition-all duration-300 ease-in-out">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Outlet />
                </motion.div>
            </div>
        </div>
    );
};

export default Dashboard;
