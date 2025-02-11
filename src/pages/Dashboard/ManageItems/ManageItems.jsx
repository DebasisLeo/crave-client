import { FaEdit, FaTrashAlt, FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Section Title */}
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl font-bold flex items-center gap-2">
                    <FaListAlt />
                    Manage All Items
                </h2>
                <p className="text-lg italic">Keep your menu up to date!</p>
            </motion.div>

            {/* Table */}
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
                            <th className="p-4">Item Name</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Update</th>
                            <th className="p-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((item, index) => (
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
                                    <Link to={`/dashboard/updateItem/${item._id}`}>
                                        <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-all duration-300">
                                            <FaEdit />
                                        </button>
                                    </Link>
                                </td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDeleteItem(item)}
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

export default ManageItems;
