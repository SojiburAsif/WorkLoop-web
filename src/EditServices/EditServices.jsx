import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import loginAnimation from '../assets/Animation - 1749826019115.json';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import Lottie from 'lottie-react';
import axios from 'axios';
import { useLoaderData, useNavigate } from 'react-router';

const EditServices = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        serviceImageUrl: '',
        serviceName: '',
        serviceArea: '',
        description: '',
        price: '',
        currency: '',
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        if (service) {
            setFormData({
                title: service.title || '',
                serviceImageUrl: service.serviceImageUrl || '',
                serviceName: service.serviceName || '',
                serviceArea: (service.serviceArea || []).join(', '),
                description: service.description || '',
                price: (service.priceRange || []).join(' - '),
                currency: service.currency || '',
            });
        }
    }, [service]);

    const containerClass = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const inputBg = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const readOnlyBg = theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-black';
    const hoverBg = theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateService = (e) => {
        e.preventDefault();

        const serviceArea = formData.serviceArea
            .split(',')
            .map(area => area.trim())
            .filter(area => area.length > 0);

        const priceRangeArray = formData.price
            .split('-')
            .map(price => price.trim())
            .filter(price => price.length > 0);

        const updatedServiceData = {
            title: formData.title,
            serviceImageUrl: formData.serviceImageUrl,
            serviceName: formData.serviceName,
            serviceArea,
            description: formData.description,
            priceRange: priceRangeArray,
            currency: formData.currency,
            providerName: user?.displayName || '',
            providerEmail: user?.email || '',
            providerImage: user?.photoURL || '',
        };

        axios.put(`http://localhost:3000/working/${service._id}`, updatedServiceData)
            .then(res => {
                console.log(res);
                Swal.fire("Updated!", "Service updated successfully!", "success");
                navigate('/manage-service');
            })
            .catch(error => {
                console.log(error);
                Swal.fire("Error", "Failed to update service!", "error");
            });
    };

    return (
        <section className={`relative min-h-screen flex items-center justify-center px-10 py-10 ${containerClass}`}>
            <div className="w-full max-w-screen-lg flex flex-col md:flex-row items-start gap-14">
                {/* Animation */}
                <div className="hidden md:block md:w-2/5 flex flex-col items-start justify-start relative -ml-16">
                    <Lottie
                        animationData={loginAnimation}
                        loop
                        className="w-[400px] h-[450px]"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleUpdateService} className="w-full md:w-3/5 space-y-8 cursor-default text-base">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold">Update Service Details</h2>
                        <p className="mt-3 text-base">Modify the fields below to update your service.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            { id: "title", label: "Service Title", type: "text", placeholder: "Enter Title", span: true },
                            { id: "serviceImageUrl", label: "Image URL", type: "url", placeholder: "Enter Photo URL" },
                            { id: "serviceName", label: "Service Name", type: "text", placeholder: "Enter Service Name" },
                            { id: "price", label: "Price Range", type: "text", placeholder: "Price Range" },
                            {
                                id: "currency", label: "Currency", type: "select",
                                options: [
                                    "Select Currency",
                                    "USD (US Dollar)",
                                    "BDT (Bangladeshi Taka)",
                                    "EUR (Euro)",
                                    "GBP (British Pound)",
                                    "INR (Indian Rupee)",
                                    "CAD (Canadian Dollar)",
                                    "AUD (Australian Dollar)"
                                ]
                            },
                            { id: "serviceArea", label: "Service Area", type: "text", placeholder: "Service Area", span: true },
                            { id: "description", label: "Description", type: "textarea", placeholder: "Describe your service", span: true }
                        ].map(({ id, label, type, placeholder, options, span }) => (
                            <fieldset key={id} className={`flex flex-col${span ? ' sm:col-span-2' : ''}`}>
                                <label htmlFor={id} className="mb-3 font-semibold">{label}</label>
                                {type === "select" ? (
                                    <select
                                        id={id}
                                        name={id}
                                        required
                                        value={formData[id]}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-3 border rounded-lg text-base ${inputBg} border-gray-300 dark:border-gray-600`}
                                    >
                                        {options.map(option => (
                                            <option key={option.split(' ')[0]} value={option.split(' ')[0]}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                ) : type === "textarea" ? (
                                    <textarea
                                        id={id}
                                        name={id}
                                        rows="5"
                                        required
                                        placeholder={placeholder}
                                        value={formData[id]}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-3 border rounded-lg text-base ${inputBg} border-gray-300 dark:border-gray-600 resize-none`}
                                    ></textarea>
                                ) : (
                                    <input
                                        id={id}
                                        name={id}
                                        type={type}
                                        required
                                        placeholder={placeholder}
                                        value={formData[id]}
                                        onChange={handleChange}
                                        className={`w-full px-5 py-3 border rounded-lg text-base ${inputBg} border-gray-300 dark:border-gray-600`}
                                    />
                                )}
                            </fieldset>
                        ))}

                        {/* Provider Name */}
                        <fieldset className="flex flex-col">
                            <label className="mb-3 font-semibold">Provider Name</label>
                            <input
                                type="text"
                                value={user?.displayName || ''}
                                readOnly
                                className={`w-full px-5 py-3 border rounded-lg text-base ${readOnlyBg} border-gray-300 dark:border-gray-600 cursor-not-allowed`}
                            />
                        </fieldset>

                        {/* Provider Email */}
                        <fieldset className="flex flex-col">
                            <label className="mb-3 font-semibold">Provider Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className={`w-full px-5 py-3 border rounded-lg text-base ${readOnlyBg} border-gray-300 dark:border-gray-600 cursor-not-allowed`}
                            />
                        </fieldset>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-5 bg-blue-600 text-white font-bold rounded-lg transition ${hoverBg} text-lg`}
                    >
                        Update Service
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditServices;
