import { useState } from 'react';
import axios from 'axios';

function AddShopItems() {
    const [productName, setProductName] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');
    const [previousPrice, setPreviousPrice] = useState('');
    const [inStock, setInStock] = useState('');
    const [flashSale, setFlashSale] = useState('');
    const [productPicture, setProductPicture] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('current_price', currentPrice);
        formData.append('previous_price', previousPrice);
        formData.append('in_stock', inStock);
        formData.append('flash_sale', flashSale);
        formData.append('product_picture', productPicture);

        try {
            const response = await axios.post('/api/add-shop-items', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Add Shop Items</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder="Product Name" />
                <input type="number" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} placeholder="Current Price" />
                <input type="number" value={previousPrice} onChange={(e) => setPreviousPrice(e.target.value)} placeholder="Previous Price" />
                <input type="number" value={inStock} onChange={(e) => setInStock(e.target.value)} placeholder="In Stock" />
                <input type="text" value={flashSale} onChange={(e) => setFlashSale(e.target.value)} placeholder="Flash Sale" />
                <input type="file" onChange={(e) => setProductPicture(e.target.files[0])} />
                <button type="submit">Add Item</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddShopItems;
