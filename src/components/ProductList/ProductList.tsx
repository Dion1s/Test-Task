import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { fetchProducts, addProduct, deleteProduct, selectAllProducts } from '../../redux/slices/productsSlice';
import Modal from '../Modal/Modal';
import './ProductList.css';

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectAllProducts);

  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);

  // State to manage input for adding a new product
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: '',
    count: 0,
    size: { width: 0, height: 0 },
    weight: '',
    imageUrl: '',
    comments: [],
  });

  // Fetch products on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handles adding a new product
  const handleAddProduct = () => {
    if (newProduct.name && newProduct.count > 0) {
      const productWithId = { ...newProduct, id: Date.now() };
      dispatch(addProduct(productWithId));
      setShowModal(false);
    }
  };

  // Handles product deletion by ID
  const handleDeleteProduct = (id: number) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div className="product-list">
      <h1>Product List</h1>

      {/* Button to show modal for adding a new product */}
      <button onClick={() => setShowModal(true)}>Add Product</button>

      {/* Product list display */} 
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {/* Product name and count */}
            {product.name} - {product.count}

            {/* Button to delete a product */}
            <button onClick={() => handleDeleteProduct(product.id)} className="delete">Delete</button>
            
            {/* Link to view product details */}
            <a href={`/product/${product.id}`} className="view">View</a>
          </li>
        ))}
      </ul>

      {/* Modal for adding a new product */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Add Product</h2>

        {/* Input fields for adding a new product */}
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Count"
          value={newProduct.count}
          onChange={(e) => setNewProduct({ ...newProduct, count: parseInt(e.target.value) })}
        />
        <input
          type="text"
          placeholder="Weight"
          value={newProduct.weight}
          onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
        />
        
        {/* Input fields for product dimensions */}
        <div>
          <input
            type="number"
            placeholder="Width"
            value={newProduct.size.width}
            onChange={(e) => setNewProduct({ ...newProduct, size: { ...newProduct.size, width: parseInt(e.target.value) } })}
          />
          <input
            type="number"
            placeholder="Height"
            value={newProduct.size.height}
            onChange={(e) => setNewProduct({ ...newProduct, size: { ...newProduct.size, height: parseInt(e.target.value) } })}
          />
        </div>

        {/* Button to confirm product addition */}
        <button onClick={handleAddProduct}>Add</button>
      </Modal>
    </div>
  );
};

export default ProductList;