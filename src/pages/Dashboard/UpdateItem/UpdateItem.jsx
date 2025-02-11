import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUtensils, FaUpload, FaSave } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const { name, category, recipe, price, _id } = useLoaderData();
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: { "content-type": "multipart/form-data" }
        });

        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            };

            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            if (menuRes.data.modifiedCount > 0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has been updated successfully!`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <motion.div
            className="max-w-3xl mx-auto p-6 sm:p-10 bg-white shadow-xl rounded-2xl border border-gray-200 mt-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Section Title */}
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-green-500 to-blue-500 text-white p-5 rounded-lg shadow-md mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <FaUtensils />
                    Update Item
                </h2>
                <p className="text-md italic">Refresh your menu details</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Recipe Name */}
                <motion.div
                    className="form-control"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <label className="label font-semibold">Recipe Name*</label>
                    <input
                        type="text"
                        defaultValue={name}
                        placeholder="Recipe Name"
                        {...register("name", { required: true })}
                        className="input input-bordered w-full"
                    />
                </motion.div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Category */}
                    <motion.div
                        className="form-control"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <label className="label font-semibold">Category*</label>
                        <select
                            defaultValue={category}
                            {...register("category", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option disabled value="default">
                                Select a category
                            </option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>
                        </select>
                    </motion.div>

                    {/* Price */}
                    <motion.div
                        className="form-control"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <label className="label font-semibold">Price*</label>
                        <input
                            type="number"
                            defaultValue={price}
                            placeholder="Price"
                            {...register("price", { required: true })}
                            className="input input-bordered w-full"
                        />
                    </motion.div>
                </div>

                {/* Recipe Details */}
                <motion.div
                    className="form-control"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <label className="label font-semibold">Recipe Details</label>
                    <textarea
                        defaultValue={recipe}
                        {...register("recipe")}
                        className="textarea textarea-bordered h-24"
                        placeholder="Describe the recipe..."
                    />
                </motion.div>

                {/* File Upload */}
                <motion.div
                    className="form-control"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <label className="label font-semibold">Upload Image*</label>
                    <div className="relative w-full max-w-xs">
                        <input
                            {...register("image", { required: true })}
                            type="file"
                            className="file-input file-input-bordered w-full"
                        />
                        <FaUpload className="absolute right-4 top-4 text-gray-500" />
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <FaSave />
                    Update Menu Item
                </motion.button>
            </form>
        </motion.div>
    );
};

export default UpdateItem;
