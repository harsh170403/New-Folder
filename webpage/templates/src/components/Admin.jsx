import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        current_price: 0,
        previous_price: 0,
        in_stock: 0,
        flash_sale: false,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/shop-items');
                setProducts(response.data);
            } catch (err) {
                console.log('Error fetching products');
            }
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/add-shop-items', newProduct);
            if (response.status === 201) {
                alert('Product added successfully');
            }
        } catch (err) {
            alert('Error adding product');
        }
    };

    return (
        <div>
            <h1>Admin</h1>
            <h2>Add Product</h2>
            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.product_name}
                    onChange={(e) => setNewProduct({ ...newProduct, product_name: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Current Price"
                    value={newProduct.current_price}
                    onChange={(e) => setNewProduct({ ...newProduct, current_price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Previous Price"
                    value={newProduct.previous_price}
                    onChange={(e) => setNewProduct({ ...newProduct, previous_price: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="In Stock"
                    value={newProduct.in_stock}
                    onChange={(e) => setNewProduct({ ...newProduct, in_stock: e.target.value })}
                />
                <label>
                    Flash Sale:
                    <input
                        type="checkbox"
                        checked={newProduct.flash_sale}
                        onChange={(e) => setNewProduct({ ...newProduct, flash_sale: e.target.checked })}
                    />
                </label>
                <button type="submit">Add Product</button>
            </form>

            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.product_name} - ${product.current_price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
