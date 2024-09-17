import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('/api/cart')
      .then(response => {
        setCart(response.data.cart);
        setTotal(response.data.total);
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  const handleRemove = (id) => {
    axios.get(`/api/remove-cart?cart_id=${id}`)
      .then(response => {
        setCart(response.data.cart);
        setTotal(response.data.total);
      })
      .catch(error => console.error('Error removing item:', error));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <h2>{item.product_name}</h2>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.current_price}</p>
            <button onClick={() => handleRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2>Total: ${total}</h2>
      <button>Place Order</button>
    </div>
  );
};

export default CartPage;
