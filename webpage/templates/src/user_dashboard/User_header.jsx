import React, { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { FaGlobe, FaUserCircle, FaShoppingCart } from "react-icons/fa"; 

const User_header = ({ sidebarToggle, setSidebarToggle }) => {
  const [showModal, setShowModal] = useState(false);
  const [addresses, setAddresses] = useState(["address"]);
  const [newAddress, setNewAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]); 
  const [selectedCategory, setSelectedCategory] = useState("All"); 
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [cartItems, setCartItems] = useState([]); 
  const [showCartDropdown, setShowCartDropdown] = useState(false);

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

  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);

  const toggleCartDropdown = () => setShowCartDropdown(!showCartDropdown);

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
          <div className='flex h-10 md:h-10 md:ml-5 bg-white text-black hover:border-2 border border-gray-300 rounded-l group-focus-within:border-blue-500'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-200 px-2 w-14 text-sm border-none outline-none rounded-l"
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
              className="bg-transparent outline-none px-4 w-52 md:w-52 lg:w-[700px] text-black"
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-[40px] md:w-[60px] h-10 flex items-center justify-center bg-yellow-500 text-black rounded-r"
          >
            <IoIosSearch className='text-2xl size-8' />
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

          <div className="relative">
            <button
              className="flex items-center ml-4 text-white"
              onClick={toggleProfileDropdown}
            >
              <FaUserCircle className="text-xl mr-1" />
              <span className="text-sm">Manage Profile</span>
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
                <div className="p-4 border-b">
                  <h3 className="font-bold mb-2">Your List</h3>
                  <ul>
                    <li><a href="/wishlist" className="hover:text-blue-600">Wish List</a></li>
                    <li><a href="/orders" className="hover:text-blue-600">Order History</a></li>
                  </ul>
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-2">Your Account</h3>
                  <ul>
                    <li><a href="/profile" className="hover:text-blue-600">Profile Settings</a></li>
                    <li><a href="/logout" className="hover:text-blue-600">Logout</a></li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="ml-4">
            <a
              href="/orders"
              className="flex flex-col text-white hover:text-yellow-500"
            >
              <span className="text-xs">Returns</span>
              <span className="font-bold">Orders</span>
            </a>
          </div>

          <div className="relative ml-4">
            <button
              className="flex items-center text-white"
              onClick={toggleCartDropdown}
            >
              <FaShoppingCart className="text-xl mr-1" />
              <span className="text-sm">Cart ({cartItems.length})</span>
            </button>

            {showCartDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-md shadow-lg z-10">
                <div className="p-4 border-b">
                  <h3 className="font-bold mb-2">Shopping Cart</h3>
                  {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                  ) : (
                    <ul>
                      {cartItems.map((item, index) => (
                        <li key={index} className="flex justify-between my-2">
                          <span>{item.name}</span>
                          <span>{item.quantity}x</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="p-4">
                  <a href="/cart" className="bg-blue-500 text-white px-4 py-2 rounded block text-center">
                    View Cart
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal */}
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

export default User_header;