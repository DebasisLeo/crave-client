import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName
                };
                axiosPublic.post('/users', userInfo)
                    .then((res) => {
                        console.log(res.data);
                        navigate('/');
                    });
            });
    };

    return (
        <motion.div
            className="p-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <div className="divider w-full max-w-xs"></div>

            <motion.button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md transition-all hover:bg-red-700 hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <FaGoogle className="text-xl" />
                Sign in with Google
            </motion.button>
        </motion.div>
    );
};

export default SocialLogin;
