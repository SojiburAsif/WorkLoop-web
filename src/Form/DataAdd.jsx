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
  const inputBg = theme === 'dark' ? 'bg-gray-900 text-white placeholder-gray-400' : 'bg-gray-100 text-black placeholder-gray-600';
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

    axios.post('https://services-server.vercel.app/working', serviceData)
      .then(res => {
        form.reset();
        Swal.fire("Success!", "Service added successfully!", "success");
      })
      .catch(error => {
        Swal.fire("Error", "Something went wrong!", "error");
      });
  };

  return (
    <section className={`min-h-screen flex items-center justify-center px-6 py-8 ${containerClass}`}>
      <div className="max-w-4xl flex flex-col md:flex-row gap-34  items-start ">
        {/* Animation */}
        <div className="hidden md:block md:w-2/5 -ml-12">
          <Lottie animationData={loginAnimation} loop className="w-[400px] h-[480px]" />
        </div>

        {/* Form */}
        <form onSubmit={handleAddService} className="w-full md:w-3/5 space-y-6 text-sm">
          <h2 className="text-3xl font-bold mb-4 text-center">Add Service Details</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Service Title */}
            <div className="sm:col-span-2">
              <label htmlFor="title" className="block mb-1 font-semibold">Service Title</label>
              <input
                id="title" name="title" type="text" placeholder="Enter Title" required
                className={`w-full p-3 rounded-lg ${inputBg} border border-gray-300 dark:border-gray-600`}
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="serviceImageUrl" className="block mb-1 font-semibold">Image URL</label>
              <input
                id="serviceImageUrl" name="serviceImageUrl" type="url" placeholder="Enter Photo URL" required
                className={`w-full p-3 rounded-lg ${inputBg} border border-gray-300 dark:border-gray-600`}
              />
            </div>

            {/* Service Name */}
            <div>
              <label htmlFor="serviceName" className="block mb-1 font-semibold">Service Name</label>
              <input
                id="serviceName" name="serviceName" type="text" placeholder="Enter Service Name" required
                className={`w-full p-3 rounded-lg ${inputBg} border border-gray-300 dark:border-gray-600`}
              />
            </div>

            {/* Price Range */}
            <div>
              <label htmlFor="price" className="block mb-1 font-semibold">Price Range</label>
              <input
                id="price" name="price" type="text" placeholder="e.g. 40-60" required
                className={`w-full p-3 rounded-lg ${inputBg} border border-gray-300 dark:border-gray-600`}
              />
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block mb-1 font-semibold">Currency</label>
              <select
                id="currency" name="currency" required
                className={`w-full p-3 rounded-lg ${inputBg} border border-gray-300 dark:border-gray-600`}
                defaultValue=""
              >
                <option disabled value="">Select Currency</option>
                <option value="USD">USD (US Dollar)</option>
                <option value="BDT">BDT (Bangladeshi Taka)</option>
              </select>
            </div>

            {/* Service Area */}
            <div className="sm:col-span-2">
              <label htmlFor="serviceArea" className="block mb-1 font-semibold">Service Area</label>
              <input
                id="serviceArea" name="serviceArea" type="text" placeholder="Separate by commas" required
                className={`w-full p-3 rounded-lg ${inputBg} border border-gray-300 dark:border-gray-600`}
              />
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block mb-1 font-semibold">Description</label>
              <textarea
                id="description" name="description" rows="4" placeholder="Describe your service" required
                className={`w-full p-3 rounded-lg resize-none ${inputBg} border border-gray-300 dark:border-gray-600`}
              />
            </div>

            {/* Provider Name */}
            <div>
              <label className="block mb-1 font-semibold">Provider Name</label>
              <input
                type="text" value={user?.displayName || ''} readOnly
                className={`w-full p-3 rounded-lg ${readOnlyBg} border border-gray-300 dark:border-gray-600 cursor-not-allowed`}
              />
            </div>

            {/* Provider Email */}
            <div>
              <label className="block mb-1 font-semibold">Provider Email</label>
              <input
                type="email" value={user?.email || ''} readOnly
                className={`w-full p-3 rounded-lg ${readOnlyBg} border border-gray-300 dark:border-gray-600 cursor-not-allowed`}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-3 font-bold rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white`}
          >
            Add Service
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddService;
