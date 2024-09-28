import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShopItemsManager = () => {
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);

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

  return (
    <div>
      <h1>Shop Items Manager</h1>
      
      <AddShopItem />

      <h2>Shop Items</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product_name} - ${item.current_price}
            <UpdateShopItem itemId={item.id} />
            <DeleteShopItem itemId={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const AddShopItem = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    current_price: '',
    previous_price: '',
    in_stock: false,
    flash_sale: false,
    product_picture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      product_picture: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      const response = await axios.post('/api/add-shop-items', form);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="product_name" onChange={handleChange} placeholder="Product Name" required />
      <input type="number" name="current_price" onChange={handleChange} placeholder="Current Price" required />
      <input type="number" name="previous_price" onChange={handleChange} placeholder="Previous Price" />
      <input type="checkbox" name="in_stock" onChange={handleChange} /> In Stock
      <input type="checkbox" name="flash_sale" onChange={handleChange} /> Flash Sale
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Add Shop Item</button>
    </form>
  );
};

const UpdateShopItem = ({ itemId }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    current_price: '',
    previous_price: '',
    in_stock: false,
    flash_sale: false,
    product_picture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      product_picture: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => form.append(key, formData[key]));

    try {
      const response = await axios.put(`/api/update-item/${itemId}`, form);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="product_name" onChange={handleChange} placeholder="Product Name" required />
      <input type="number" name="current_price" onChange={handleChange} placeholder="Current Price" required />
      <input type="number" name="previous_price" onChange={handleChange} placeholder="Previous Price" />
      <input type="checkbox" name="in_stock" onChange={handleChange} /> In Stock
      <input type="checkbox" name="flash_sale" onChange={handleChange} /> Flash Sale
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Update Item</button>
    </form>
  );
};

const DeleteShopItem = ({ itemId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-item/${itemId}`);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return <button onClick={handleDelete}>Delete Item</button>;
};

export default ShopItemsManager;
