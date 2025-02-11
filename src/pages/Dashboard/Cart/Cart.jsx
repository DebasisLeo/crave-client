import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Item has been removed from your cart.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-lg shadow-lg mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    <FaShoppingCart />
                    Items: {cart.length}
                </h2>
                <h2 className="text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
                {cart.length ? (
                    <Link to="/dashboard/payment">
                        <button className="btn bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition-all duration-300">
                            Proceed to Pay
                        </button>
                    </Link>
                ) : (
                    <button disabled className="btn bg-gray-400 text-white px-5 py-2 rounded-lg cursor-not-allowed">
                        Proceed to Pay
                    </button>
                )}
            </motion.div>

            <motion.div
                className="overflow-x-auto bg-white shadow-lg rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <table className="table w-full">
                    <thead className="bg-indigo-600 text-white">
                        <tr>
                            <th className="p-4">#</th>
                            <th className="p-4">Image</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <motion.tr
                                key={item._id}
                                className="border-b hover:bg-gray-100 transition-all duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <td className="p-4 text-center">{index + 1}</td>
                                <td className="p-4 flex justify-center">
                                    <div className="w-14 h-14 rounded-lg overflow-hidden">
                                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                    </div>
                                </td>
                                <td className="p-4 text-center font-semibold">{item.name}</td>
                                <td className="p-4 text-center text-green-600 font-bold">${item.price.toFixed(2)}</td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default Cart;
