import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaGlobe } from "react-icons/fa";

const Header = ({ sidebarToggle, setSidebarToggle }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState(["123 Main St, New York, NY"]);
  const [newAddress, setNewAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Electronics", "Books", "Clothing", "Home & Kitchen", "Toys", "Beauty", "Sports"];

  const toggleModal = () => setShowModal(!showModal);

  const handleSaveAddress = () => {
    if (editIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editIndex] = newAddress;
      setAddresses(updatedAddresses);
      if (editIndex === addresses.indexOf(selectedAddress)) {
        setSelectedAddress(newAddress); 
      }
    } else {
      setAddresses([...addresses, newAddress]);
    }
    setNewAddress("");
    setEditIndex(null);
    toggleModal();
  };

  
  const handleRemoveAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (addresses[index] === selectedAddress) {
      setSelectedAddress(updatedAddresses[0] || "");
    }
  };


  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditIndex(index);
    toggleModal();
  };

  
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    toggleModal();
  };

  
  const handleSearch = () => {
    console.log(`Searching for "${searchQuery}" in category "${selectedCategory}"`);
  };

  return (
    <div>
      <div className='bg-gray-900 items-center text-white py-3 flex justify-between h-14'>
        <div className='flex items-center'>
          <a href="/" className="flex items-center ml-4">
            <img src="/image/Screenshot from 2024-09-21 12-18-11.png" alt="amazon" className="h-8" />
          </a>

          <div className="flex flex-col justify-center ml-4 cursor-pointer" onClick={toggleModal}>
            <span className="text-xs text-gray-300">Deliver to</span>
            <span className="text-sm font-bold">{selectedAddress || "Choose an address"}</span>
          </div>
        </div>

        <div className='flex items-center group'>
          <div className='flex h-10 md:h-10 md:ml-5 md:pl-5 bg-white text-black hover:border-2 border border-gray-300 rounded-l group-focus-within:border-blue-500'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-200 px-2 text-sm border-none outline-none rounded-l"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="bg-transparent outline-none px-4 w-52 md:w-96 lg:w-[500px] text-black"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-[40px] md:w-[60px] h-10 flex items-center justify-center bg-yellow-500 text-black rounded-r"
          >
            <IoIosSearch className='text-2xl' />
          </button>
        </div>

        <div className='flex items-center'>
          <div className="flex items-center text-white mx-4 cursor-pointer">
            <FaGlobe className='text-xl mr-1' />
            <select className="bg-white text-black outline-none">
              <option value="EN">EN</option>
              <option value="ES">ES</option>
              <option value="FR">FR</option>
              <option value="DE">DE</option>
              <option value="HI">HI</option>
            </select>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">{editIndex !== null ? "Update Address" : "Add Address"}</h2>
            <input
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
              placeholder="Enter your address"
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleSaveAddress} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={toggleModal} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>

            <h3 className="text-lg font-bold mt-6">Manage Addresses</h3>
            <ul className="mt-2">
              {addresses.map((address, index) => (
                <li key={index} className="flex justify-between items-center my-2">
                  <span>{address}</span>
                  <div className="flex">
                    <button
                      onClick={() => handleEditAddress(index)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveAddress(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleSelectAddress(address)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Select
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
