import React from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure Bootstrap CSS is imported

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Hot Coffee',
    type: 'shop'
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (data.name === '' || data.description === '' || data.price === '' || image === false) {
      return toast.error('All fields are required');
    }
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('type', data.type);
    formData.append('image', image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: '',
        description: '',
        price: '',
        category: 'Hot Coffee'
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFile = () => {
    setImage(null);
    setData({
      name: '',
      description: ''
    });
  };

  return (
    <div className="table-container">
      <h3>Add Product</h3>
      <div className="add-form">
        <form onSubmit={onSubmitHandler} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Upload Image</label>
            <div className="image-upload text-center">
              <label htmlFor="image">
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_area}
                  alt="upload preview"
                  className="img-fluid"
                  style={{ width: '150px', height: '150px', objectFit: 'cover', cursor: 'pointer' }}
                />
              </label>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                className="form-control"
                hidden
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">Product Name</label>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="Type here"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Product Description</label>
            <textarea
              onChange={onChangeHandler}
              value={data.description}
              id="description"
              name="description"
              className="form-control"
              rows="4"
              placeholder="Write content"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="category" className="form-label">Product Category</label>
              <select
                onChange={onChangeHandler}
                value={data.category}
                name="category"
                id="category"
                className="form-select"
              >
                <option value="Hot Coffee">Hot Coffee</option>
                <option value="Cold Coffee">Cold Coffee</option>
                <option value="Cold Brew">Cold Brew</option>
                <option value="Iced Tea">Iced Tea</option>
                <option value="Fizzy Drinks">Fizzy Drinks</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="price" className="form-label">Product Price</label>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                id="price"
                name="price"
                className="form-control"
                placeholder="Rs.250"
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button onClick={removeFile} type="reset" className="btn btn-danger">Clear</button>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
