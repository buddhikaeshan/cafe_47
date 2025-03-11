import React, { useState, useEffect } from 'react';
import './UpdateModal.css';

const OfferModel = ({ isOpen, onClose, item, onUpdate, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    endDate:'',
    startDate:'',
    image: null,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        startDate: item.startDate,
        endDate: item.endDate,
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
    setFormData({ name: '', category: '', price: '',endDate:'', startDate:'', image: null });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="content">
        <h2>Update Offer</h2>
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
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label>Start Date:</label>
          <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} />

          <label>End Date:</label>
          <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} />

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

export default OfferModel;
