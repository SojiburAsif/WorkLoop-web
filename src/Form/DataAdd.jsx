import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import loginAnimation from '../assets/Animation - 1749106191160.json';
import { AuthContext } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleAddTask = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const taskData = Object.fromEntries(formData.entries());

        taskData.createdAt = new Date().toISOString();

        fetch('https://backend-zeta-ochre-92.vercel.app/working', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(taskData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Task Added Successfully!",
                        icon: "success"
                    });
                    form.reset();
                    navigate('/main-tasks');
                }
            });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 py-10">
            {/* Form Section */}
            <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-start gap-10">
                <form
                    onSubmit={handleAddTask}
                    className="w-full md:w-2/3 space-y-6 cursor-default"
                >
                    <h2 className="text-3xl font-extrabold text-black text-center">Add Task Details</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <fieldset className="flex flex-col">
                            <label htmlFor="title" className="mb-2 text-black font-semibold">Task Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                required
                                placeholder="Enter Task Title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="category" className="mb-2 text-black font-semibold">Category</label>
                            <select
                                id="category"
                                name="category"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </fieldset>

                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="description" className="mb-2 text-black font-semibold">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                required
                                placeholder="Describe the task"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
                            ></textarea>
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="deadline" className="mb-2 text-black font-semibold">Deadline</label>
                            <input
                                id="deadline"
                                type="date"
                                name="deadline"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="budget" className="mb-2 text-black font-semibold">Budget</label>
                            <input
                                id="budget"
                                type="number"
                                name="budget"
                                required
                                placeholder="Enter Budget"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="email" className="mb-2 text-black font-semibold">User Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                readOnly
                                defaultValue={user?.email || ''}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black bg-gray-100 cursor-not-allowed"
                            />
                        </fieldset>

                        <fieldset className="flex flex-col">
                            <label htmlFor="username" className="mb-2 text-black font-semibold">User Name</label>
                            <input
                                id="username"
                                type="text"
                                name="username"
                                readOnly
                                defaultValue={user?.displayName || ''}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black bg-gray-100 cursor-not-allowed"
                            />
                        </fieldset>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-purple-800 text-white font-bold rounded-lg transition hover:bg-purple-600"
                    >
                        Add Task
                    </button>
                </form>

                {/* Lottie Animation Section */}
                <div className="w-full md:w-1/3 flex flex-col items-center justify-end relative">
                    <Lottie animationData={loginAnimation} loop={true} className="w-[400px] h-[400px]" />
                    <p className="text-center text-purple-700 font-medium mt-4">
                        "Turn your ideas into tasks and get things done!"
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AddTask;
