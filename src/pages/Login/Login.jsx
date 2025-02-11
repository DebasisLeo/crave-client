import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { FaEnvelope, FaLock, FaKey } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Culinary Crave | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="hero-content flex-col md:flex-row-reverse">
                    <motion.div 
                        className="text-center md:w-1/2 lg:text-left"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-extrabold text-white">Login Now!</h1>
                        <p className="py-6 text-white opacity-80">Log in to explore delicious foods and great offers. Get started now!</p>
                    </motion.div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100 rounded-lg">
                        <form onSubmit={handleLogin} className="card-body space-y-6">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"><FaEnvelope className="mr-2" /> Email</span>
                                </label>
                                <input type="email" name="email" placeholder="Email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text"><FaLock className="mr-2" /> Password</span>
                                </label>
                                <input type="password" name="password" placeholder="Password" className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <div className="flex items-center justify-between">
                                    <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the captcha above" className="input input-bordered w-3/4" />
                                    <motion.button
                                        type="submit"
                                        className="btn btn-primary w-1/4"
                                        disabled={disabled}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <FaKey />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <motion.input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Login"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </form>
                        <p className="px-6"><small>New here? <Link to="/signup" className="text-blue-500">Create an account</Link></small></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
