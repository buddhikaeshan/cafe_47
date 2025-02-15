import React, { useState, useEffect } from 'react';
import './UpdateModal.css';

const UpdateModal = ({ isOpen, onClose, item, onUpdate, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image: null,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        image: null,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onUpdate(item._id, formData);
    setFormData({ name: '', category: '', price: '', image: null }); // Reset form data
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="content">
        <h2>Update Food Item</h2>
        <form onSubmit={handleSubmit}>
          <label>Image:</label>
          <input type="file" onChange={handleImageChange} />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn-update">
              Update
            </button>
            <button type="button" className="btn-remove" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
