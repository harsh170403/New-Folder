import React, { useState } from 'react';
import axios from 'axios';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.get(`/api/search?query=${query}`)
      .then(response => setResults(response.data))
      .catch(error => console.error('Error searching products:', error));
  };

  return (
    <div>
      <h1>Search Products</h1>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(product => (
          <li key={product.id}>
            <h2>{product.product_name}</h2>
            <p>Price: ${product.current_price}</p>
            <img src={`/media/${product.product_picture}`} alt={product.product_name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
