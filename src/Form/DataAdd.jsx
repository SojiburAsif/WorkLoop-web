import React, { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import loginAnimation from '../assets/Animation - 1749106191160.json';
import { AuthContext } from '../Contexts/AuthContext';
import { ThemeContext } from '../Them/ThemProvider';
import Lottie from 'lottie-react';
import axios from 'axios';

const AddService = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const containerClass = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const inputBg = theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black';
    const readOnlyBg = theme === 'dark' ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-black';
    const hoverBg = theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-200';

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

        axios.post('https://backend-zeta-ochre-92.vercel.app/working', serviceData)
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
        <section className={`relative min-h-screen flex items-center justify-center px-8 py-12 ${containerClass}`}>
            <div className="w-full max-w-screen-xl flex flex-col md:flex-row items-start gap-20">
                {/* Animation */}
                <div className="w-full md:w-2/5 flex flex-col items-start justify-start relative -ml-24">
                    <Lottie
                        animationData={loginAnimation}
                        loop
                        className="w-[520px] h-[620px]"
                    />
                </div>

                {/* Form */}
                <form onSubmit={handleAddService} className="w-full md:w-3/5 space-y-8 cursor-default text-[18px]">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold">Add Service Details</h2>
                        <p className="mt-3 text-base">Fill the form below to publish your service to the platform.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                        {[
                            { id: "title", label: "Service Title", type: "text", placeholder: "Enter Titel", span: true },
                            { id: "serviceImageUrl", label: "Image URL", type: "url", placeholder: "Enter Photo url" },
                            { id: "serviceName", label: "Service Name", type: "text", placeholder: "Enter Service Name" },
                            { id: "price", label: "Price Range", type: "text", placeholder: "Price Range" },
                            {
                                id: "currency", label: "Currency", type: "select",
                                options: [
                                    "Select Currency",
                                    "USD (US Dollar)",
                                    "BDT (Bangladeshi Taka)",
                                  
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
                                        className={`w-full px-5 py-4 border rounded-lg text-lg ${inputBg} border-gray-300 dark:border-gray-600`}
                                    >
                                        {options.map(option => (
                                            <option key={option.split(' ')[0]} value={option.split(' ')[0]}>{option}</option>
                                        ))}
                                    </select>
                                ) : type === "textarea" ? (
                                    <textarea
                                        id={id}
                                        name={id}
                                        rows="5"
                                        required
                                        placeholder="Enter Description"
                                        className={`w-full px-5 py-4 border rounded-lg text-lg ${inputBg} border-gray-300 dark:border-gray-600 resize-none`}
                                    ></textarea>
                                ) : (
                                    <input
                                        id={id}
                                        name={id}
                                        type={type}
                                        required
                                        placeholder={placeholder}
                                        className={`w-full px-5 py-4 border rounded-lg text-lg ${inputBg} border-gray-300 dark:border-gray-600`}
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
                                className={`w-full px-5 py-4 border rounded-lg text-lg ${readOnlyBg} border-gray-300 dark:border-gray-600 cursor-not-allowed`}
                            />
                        </fieldset>

                        {/* Provider Email */}
                        <fieldset className="flex flex-col">
                            <label className="mb-3 font-semibold">Provider Email</label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className={`w-full px-5 py-4 border rounded-lg text-lg ${readOnlyBg} border-gray-300 dark:border-gray-600 cursor-not-allowed`}
                            />
                        </fieldset>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-7 btn  bg-blue-500 font-bold rounded-lg transition ${hoverBg} text-lg`}
                    >
                        Add Service
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddService;
