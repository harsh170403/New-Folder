import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h1>Flash Sale Items</h1>
      <div>
        {items.map(item => (
          <div key={item.id}>
            <h2>{item.product_name}</h2>
            <p>Price: ${item.current_price}</p>
            <img src={`/media/${item.product_picture}`} alt={item.product_name} />
            <Link to={`/product/${item.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
