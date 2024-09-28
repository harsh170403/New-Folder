import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersCustomersManager = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/view-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers', error);
      }
    };

    fetchOrders();
    fetchCustomers();
  }, []);

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleOrderUpdate = async (orderId) => {
    try {
      const response = await axios.put(`/api/update-order/${orderId}`, { order_status: orderStatus });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Orders and Customers Manager</h1>
      
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            {order.customer_name} - {order.status}
            <form onSubmit={(e) => { e.preventDefault(); handleOrderUpdate(order.id); }}>
              <input
                type="text"
                value={selectedOrderId === order.id ? orderStatus : ''}
                onChange={handleStatusChange}
                placeholder="Order Status"
                required
              />
              <button type="submit" onClick={() => setSelectedOrderId(order.id)}>
                Update Order
              </button>
            </form>
          </li>
        ))}
      </ul>

      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer.id}>
            {customer.name} - {customer.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersCustomersManager;
