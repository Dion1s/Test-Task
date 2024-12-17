import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import {
  fetchProducts,
  updateProduct,
} from '../../redux/slices/productsSlice';
import {
  fetchComments,
  addComment,
  deleteComment,
  selectCommentsByProduct,
} from '../../redux/slices/commentsSlice';
import './ProductView.css';

const ProductView: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract product ID from URL parameters
  const dispatch = useDispatch<AppDispatch>();
  const productId = parseInt(id!);

  // Select the product and its related comments from Redux state
  const product = useSelector((state: RootState) =>
    state.products.items.find((p) => p.id === productId)
  );
  const comments = useSelector((state: RootState) =>
    selectCommentsByProduct(state, productId)
  );

  // Local states for editing and comment management
  const [editMode, setEditMode] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  const [newComment, setNewComment] = useState('');

  // Fetch initial product and comment data on component mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchComments());
  }, [dispatch]);

  // Synchronize edited product state with current product data
  useEffect(() => {
    setEditedProduct(product);
  }, [product]);

  // Add a new comment to the product
  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(
        addComment({
          id: Date.now(),
          productId,
          description: newComment,
          date: new Date().toISOString(),
        })
      );
      setNewComment('');
    }
  };

  // Delete a specific comment by ID
  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  // Update the product details
  const handleUpdateProduct = () => {
    if (editedProduct) {
      dispatch(updateProduct(editedProduct));
      setEditMode(false);
    }
  };

  if (!product) return <div>Loading...</div>; // Show loading message if product data is unavailable

  return (
    <div className="product-view">
      {/* Edit Mode for updating product details */}
      {editMode ? (
        <div>
          <h1>Edit Product</h1>
          <input
            type="text"
            placeholder="Name"
            value={editedProduct?.name || ''}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct!, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Count"
            value={editedProduct?.count || 0}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct!,
                count: parseInt(e.target.value),
              })
            }
          />
          <input
            type="text"
            placeholder="Weight"
            value={editedProduct?.weight || ''}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct!, weight: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editedProduct?.imageUrl || ''}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct!, imageUrl: e.target.value })
            }
          />
          <button onClick={handleUpdateProduct}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        // Display product details in view mode
        <div>
          <h1>{product.name}</h1>
          <img
            src={product.imageUrl}
            alt={product.name}
          />
          <p>Count: {product.count}</p>
          <p>Weight: {product.weight}</p>
          <p>
            Size: {product.size.width} x {product.size.height}
          </p>
          <button onClick={() => setEditMode(true)}>Edit Product</button>
        </div>
      )}

      {/* Comments Section */}
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.description} ({new Date(comment.date).toLocaleString()})
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <button onClick={() => setNewComment('')}>Cancel</button>
    </div>
  );
};

export default ProductView;
