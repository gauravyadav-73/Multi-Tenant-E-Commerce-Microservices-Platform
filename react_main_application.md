import React, { useState, useEffect } from 'react';
import api from './api';

function App() {
  const [tenant, setTenant] = useState(localStorage.getItem('tenantId') || 'tenant_a');
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/v1/products');
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load products', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [tenant]);

  const handleTenantChange = (e) => {
    const selectedTenant = e.target.value;
    setTenant(selectedTenant);
    localStorage.setItem('tenantId', selectedTenant);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/api/v1/products', { name, description: 'Multi-tenant Item', price: parseFloat(price) });
    setName('');
    setPrice('');
    fetchProducts();
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Multi-Tenant E-Commerce Platform</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Select Tenant Context: </label>
        <select value={tenant} onChange={handleTenantChange}>
          <option value="tenant_a">Tenant A (Store 1)</option>
          <option value="tenant_b">Tenant B (Store 2)</option>
        </select>
      </div>

      <h2>Products for [{tenant.toUpperCase()}]</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>

      <h3>Add Product to {tenant}</h3>
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Product Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          placeholder="Price" 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default App;