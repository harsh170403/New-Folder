import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  // State for shop items
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // For updating shop items
  const [formData, setFormData] = useState({
    product_name: '',
    current_price: '',
    previous_price: '',
    in_stock: false,
    flash_sale: false,
    product_picture: null
  });

  // State for orders and customers
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  // Fetch Shop Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/shop-items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };
    fetchItems();
  }, []);

  // Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/view-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };
    fetchOrders();
  }, []);

  // Fetch Customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };
    fetchCustomers();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      product_picture: e.target.files[0]
    }));
  };

  // Add or Update Shop Item
  const handleSubmitItem = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      if (selectedItem) {
        const response = await axios.put(`/api/update-item/${selectedItem.id}`, form);
        alert(response.data.message);
      } else {
        const response = await axios.post('/api/add-shop-items', form);
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  // Delete Shop Item
  const handleDeleteItem = async (itemId) => {
    try {
      const response = await axios.delete(`/api/delete-item/${itemId}`);
      alert(response.data.message);
      setItems(items.filter(item => item.id !== itemId)); // Remove from local state
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  // Handle order update
  const handleOrderSubmit = async (orderId) => {
    try {
      const response = await axios.put(`/api/update-order/${orderId}`, { order_status: orderStatus });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      {/* Shop Items */}
      <section>
        <h2>Manage Shop Items</h2>
        <form onSubmit={handleSubmitItem}>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />
          <input
            type="number"
            name="current_price"
            value={formData.current_price}
            onChange={handleChange}
            placeholder="Current Price"
            required
          />
          <input
            type="number"
            name="previous_price"
            value={formData.previous_price}
            onChange={handleChange}
            placeholder="Previous Price"
          />
          <label>
            <input
              type="checkbox"
              name="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
            />
            In Stock
          </label>
          <label>
            <input
              type="checkbox"
              name="flash_sale"
              checked={formData.flash_sale}
              onChange={handleChange}
            />
            Flash Sale
          </label>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">{selectedItem ? 'Update Item' : 'Add Shop Item'}</button>
        </form>

        {/* Shop Items List */}
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product_name} - ${item.current_price}
              <button onClick={() => setSelectedItem(item)}>Edit</button>
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>

      {/* Orders */}
      <section>
        <h2>Orders</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.customer_name} - {order.status}
              <form onSubmit={() => handleOrderSubmit(order.id)}>
                <input
                  type="text"
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  placeholder="Order Status"
                  required
                />
                <button type="submit">Update Order</button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      {/* Customers */}
      <section>
        <h2>Customers</h2>
        <ul>
          {customers.map((customer) => (
            <li key={customer.id}>
              {customer.name} - {customer.email}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
