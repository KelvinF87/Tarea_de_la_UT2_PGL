import React, { useState, useEffect } from "react";
import './Modal.css';

const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  price: '',
  categoria_id: '',
  disponible: true,
};

export const Modal = ({ isOpen, onClose, onSubmit, onDelete, type, initialData }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (!isOpen) return;
    let initialState = { ...INITIAL_FORM_STATE };

    if (type === 'edit-category') {
        initialState.name = initialData?.categoryName || '';
        initialState.description = initialData?.categoryDescription || '';
    } else if (type === 'add-item') {
        initialState.categoria_id = initialData?.categoryId || initialData?.categorias?.[0]?.id || '';
    } else if (type === 'edit-item') {
        const item = initialData?.item;
        const categoryId = initialData?.categorias?.find(cat => cat.nombre === item?.categoria_nombre)?.id || '';
        initialState = {
            name: item?.nombre || '',
            price: item?.precio || '',
            categoria_id: categoryId,
            disponible: item?.disponible ?? true,
            description: item?.description || '',
        };
    }
    setFormData(initialState);
  }, [type, initialData, isOpen]);

  if (!isOpen) {
    return null;
  }
  const isDeleteConfirmation = type?.startsWith('delete');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
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
      case 'add-item': return `Add New Item`;
      case 'edit-item': return `Edit Item: ${initialData.item.nombre}`;
      case 'delete-item': return `Delete Item: ${initialData.item.nombre}?`;
      default: return 'Modal';
    }
  };
  
  const renderFormFields = () => {
    switch (type) {
      case 'add-category':
      case 'edit-category':
        return (
          <>
            <div className="form-group">
                <label htmlFor="name">Category Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required autoFocus />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description (optional):</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            </div>
          </>
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
            <div className="form-group">
              <label htmlFor="categoria_id">Category:</label>
              <select id="categoria_id" name="categoria_id" value={formData.categoria_id} onChange={handleChange} required>
                <option value="">Select a category</option>
                {initialData.categorias?.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
            <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
              <label htmlFor="disponible" style={{ marginRight: '10px', marginBottom: 0 }}>Available:</label>
              <input type="checkbox" id="disponible" name="disponible" checked={formData.disponible} onChange={handleChange} />
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