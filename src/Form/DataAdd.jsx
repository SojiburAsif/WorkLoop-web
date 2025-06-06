import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import loginAnimation from '../assets/Animation - 1749106191160.json';
import { AuthContext } from '../Contexts/AuthContext';
import Lottie from 'lottie-react';
import axios from 'axios';

const AddService = () => {
    const { user } = useContext(AuthContext);

    const handleAddService = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData.entries());

        const serviceArea = rawData.serviceArea
            .split(',')
            .map(area => area.trim())
            .filter(area => area.length > 0);

        const priceRangeArray = rawData.price
            .split('-')
            .map(price => price.trim())
            .filter(price => price.length > 0);

        const serviceData = {
            title: rawData.title,
            serviceImageUrl: rawData.serviceImageUrl,
            serviceName: rawData.serviceName,
            serviceArea,
            description: rawData.description,
            priceRange: priceRangeArray,
            currency: rawData.currency,
            providerName: user?.displayName || '',
            providerEmail: user?.email || '',
            providerImage: user?.photoURL || '',
        };

        console.log("Final Data To Send:", serviceData);

        axios.post('http://localhost:3000/working', serviceData)
            .then(res => {
                console.log(res);
                form.reset();
                Swal.fire("Success!", "Service added successfully!", "success");
            })
            .catch(error => {
                console.error(error);
                Swal.fire("Error", "Something went wrong!", "error");
            });
    };

    return (
        <section className="relative min-h-screen space-grotesk flex items-center justify-center px-8 py-12">
            <div className="w-full max-w-screen-xl flex flex-col md:flex-row items-start gap-20">
                {/* Animation */}
                <div className="w-full md:w-2/5 flex flex-col items-start justify-start relative -ml-24">
                    <Lottie
                        animationData={loginAnimation}
                        loop={true}
                        className="w-[520px] h-[620px]"
                    />
                </div>

                {/* Form */}
                <form
                    onSubmit={handleAddService}
                    className="w-full md:w-3/5 space-y-8 cursor-default text-[18px]"
                >
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-black">Add Service Details</h2>
                        <p className="text-gray-600 mt-3 text-base">
                            Fill the form below to publish your service to the platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                        {/* Title */}
                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="title" className="mb-3 text-black font-semibold">Service Title</label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                required
                                placeholder="e.g. Professional AC Repair at Home"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black text-lg"
                            />
                        </fieldset>

                        {/* Image URL */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="serviceImageUrl" className="mb-3 text-black font-semibold">Image URL</label>
                            <input
                                id="serviceImageUrl"
                                type="url"
                                name="serviceImageUrl"
                                required
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black text-lg"
                            />
                        </fieldset>

                        {/* Service Name */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="serviceName" className="mb-3 text-black font-semibold">Service Name</label>
                            <input
                                id="serviceName"
                                type="text"
                                name="serviceName"
                                required
                                placeholder="Enter Service Name"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black text-lg"
                            />
                        </fieldset>

                        {/* Price Range */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="price" className="mb-3 text-black font-semibold">Price Range</label>
                            <input
                                id="price"
                                type="text"
                                name="price"
                                required
                                placeholder="e.g. 1000 - 3000"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black text-lg"
                            />
                        </fieldset>

                        {/* Currency */}
                        <fieldset className="flex flex-col">
                            <label htmlFor="currency" className="mb-3 text-black font-semibold">Currency</label>
                            <select
                                id="currency"
                                name="currency"
                                required
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black bg-white text-lg"
                            >
                                <option value="">Select Currency</option>
                                <option value="USD">USD (US Dollar)</option>
                                <option value="BDT">BDT (Bangladeshi Taka)</option>
                                <option value="EUR">EUR (Euro)</option>
                                <option value="GBP">GBP (British Pound)</option>
                                <option value="INR">INR (Indian Rupee)</option>
                                <option value="CAD">CAD (Canadian Dollar)</option>
                                <option value="AUD">AUD (Australian Dollar)</option>
                            </select>
                        </fieldset>

                        {/* Service Area */}
                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="serviceArea" className="mb-3 text-black font-semibold">Service Area</label>
                            <input
                                id="serviceArea"
                                type="text"
                                name="serviceArea"
                                required
                                placeholder="e.g. Dhaka, Chittagong, Sylhet"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black text-lg"
                            />
                        </fieldset>

                        {/* Description */}
                        <fieldset className="flex flex-col sm:col-span-2">
                            <label htmlFor="description" className="mb-3 text-black font-semibold">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                required
                                placeholder="Describe your service"
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black text-lg resize-none"
                            ></textarea>
                        </fieldset>

                        {/* Provider Name */}
                        <fieldset className="flex flex-col">
                            <label className="mb-3 text-black font-semibold">Provider Name</label>
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                readOnly
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black bg-gray-100 cursor-not-allowed text-lg"
                            />
                        </fieldset>

                        {/* Provider Email */}
                        <fieldset className="flex flex-col">
                            <label className="mb-3 text-black font-semibold">Provider Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="w-full px-5 py-4 border border-gray-300 rounded-lg text-black bg-gray-100 cursor-not-allowed text-lg"
                            />
                        </fieldset>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-5 bg-purple-800 text-white font-bold rounded-lg transition hover:bg-purple-600 text-lg"
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddService;
