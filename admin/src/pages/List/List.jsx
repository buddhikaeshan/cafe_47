import React, { useState, useEffect } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import UpdateModal from './UpdateModal';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        const listData=response.data.data.filter((item)=> item.type==='shop');
        setList(listData);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error fetching the list");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Error removing the item");
    }
  };

  const updateFood = async (foodId, data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('price', data.price);
      if (data.image) {
        formData.append('image', data.image);
      }
  
      const response = await axios.put(`${url}/api/food/update/${foodId}`, formData);
      
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error updating the item");
      }
    } catch (error) {
      toast.error("Error updating the item");
    }
  };

  const categories = ['Hot Coffee', 'Cold Coffee', 'Cold Brew', 'Iced Tea', 'Fizzy Drinks'];

  useEffect(() => {
    fetchList();
  }, []);

  //generate PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Food Items List', 14, 20);

    const tableColumn = ['Name', 'Category', 'Price'];
    const tableRows = [];

    list.forEach((item) => {
      const rowData = [
        item.name,
        item.category,
        `Rs. ${item.price}`
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
    });

    doc.save('food_items_list.pdf');
  };

  return (
    <div className="table-container">
      <h3>Product List</h3>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={generatePDF}>
         PDF
        </button>
      </div>
      <table className="table table-striped table-dark table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td><img src={`${url}/images/${item.image}`} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>Rs.{item.price}</td>
              <td>
                <span className="btn-update" onClick={() => { setCurrentItem(item); setIsModalOpen(true); }}>Update</span>
                <span className="btn-remove" onClick={() => removeFood(item._id)}> Remove </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        item={currentItem} 
        onUpdate={updateFood}
        categories={categories}
      />
    </div>
  );
};

export default List;
