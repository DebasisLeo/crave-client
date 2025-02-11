import useAuth from "../../../hooks/useAuth";
import { motion } from "framer-motion";
import { FaSmile, FaUserCircle } from "react-icons/fa";

const UserHome = () => {
    const { user } = useAuth();

    return (
        <motion.div
            className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            {/* User Avatar */}
            <motion.div
                className="bg-white p-2 rounded-full shadow-lg mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                {user?.photoURL ? (
                    <img src={user.photoURL} alt="User Avatar" className="w-20 h-20 rounded-full" />
                ) : (
                    <FaUserCircle className="text-gray-700 w-20 h-20" />
                )}
            </motion.div>

            {/* Greeting Message */}
            <motion.h2
                className="text-3xl sm:text-4xl font-bold flex items-center gap-2 bg-white bg-opacity-20 p-4 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
            >
                <FaSmile className="text-yellow-300" />
                Hi, Welcome {user?.displayName ? user.displayName : "Back"}!
            </motion.h2>

            {/* Subtext */}
            <motion.p
                className="mt-4 text-lg italic text-white text-opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                We're glad to have you here. Let's make something awesome today! 🚀
            </motion.p>
        </motion.div>
    );
};

export default UserHome;
