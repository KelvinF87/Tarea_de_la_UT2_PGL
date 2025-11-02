import React, { useState, useEffect } from "react";
import './Modal.css';

export const Modal = ({ isOpen, onClose, onSubmit, onDelete, type, initialData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
        if (type === 'edit-category') {
          setFormData({ name: initialData?.categoryName || '' });
        } else if (type === 'edit-item') {
          setFormData({ name: initialData?.item?.name || '', price: initialData?.item?.price || '' });
        } else {
          setFormData({ name: '', price: '' });
        }
    }
  }, [type, initialData, isOpen]);

  if (!isOpen) {
    return null;
  }

  const isDeleteConfirmation = type?.startsWith('delete');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  const getTitle = () => {
    switch (type) {
      case 'add-category': return 'Add New Category';
      case 'edit-category': return `Edit Category: ${initialData.categoryName}`;
      case 'delete-category': return `Delete Category: ${initialData.categoryName}?`;
      case 'add-item': return `Add New Item to ${initialData.categoryName}`;
      case 'edit-item': return `Edit Item: ${initialData.item.name}`;
      case 'delete-item': return `Delete Item: ${initialData.item.name}?`;
      default: return 'Modal';
    }
  };

  const renderFormFields = () => {
    switch (type) {
      case 'add-category':
      case 'edit-category':
        return (
          <div className="form-group">
            <label htmlFor="name">Category Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoFocus />
          </div>
        );
      case 'add-item':
      case 'edit-item':
        return (
          <>
            <div className="form-group">
              <label htmlFor="name">Item Name:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoFocus />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" min="0" required />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2>{getTitle()}</h2>
        {isDeleteConfirmation ? (
            <div className="confirmation-content">
                <p>Are you sure? This action cannot be undone.</p>
                <div className="confirmation-buttons">
                    <button onClick={handleDeleteClick} className="btn-delete">Delete</button>
                    <button onClick={onClose} className="btn-cancel">Cancel</button>
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit}>
                {renderFormFields()}
                <button type="submit" className="btn-submit">Save Changes</button>
            </form>
        )}
      </div>
    </div>
  );
};
