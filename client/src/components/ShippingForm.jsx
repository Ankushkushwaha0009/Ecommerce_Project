import React from "react";

const ShippingForm = ({ shippingData, setShippingData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        Shipping Address
      </h2>

      <form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* First Name */}
          <div>
            <label className="block mb-2 font-medium">
              First Name
            </label>

            <input
              type="text"
              name="firstName"
              value={shippingData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block mb-2 font-medium">
              Last Name
            </label>

            <input
              type="text"
              name="lastName"
              value={shippingData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={shippingData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={shippingData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Address
            </label>

            <textarea
              rows="4"
              name="address"
              value={shippingData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          {/* City */}
          <div>
            <label className="block mb-2 font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={shippingData.city}
              onChange={handleChange}
              placeholder="Enter city"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* State */}
          <div>
            <label className="block mb-2 font-medium">
              State
            </label>

            <input
              type="text"
              name="state"
              value={shippingData.state}
              onChange={handleChange}
              placeholder="Enter state"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block mb-2 font-medium">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={shippingData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-2 font-medium">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={shippingData.country}
              onChange={handleChange}
              placeholder="Enter country"
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

        </div>
      </form>
    </div>
  );
};

export default ShippingForm;