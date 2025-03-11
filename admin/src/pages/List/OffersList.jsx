import React, { useState, useEffect } from 'react';
import './List.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import OfferModel from './OfferModel';

const OffersList = ({ url }) => {
  const [list, setList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/offer/list`);
      if (response.data.success) {
        let listData = response.data.data;
        const currentDate = new Date();

        // Check for expired offers and update status
        for (const item of listData) {
          const endDate = new Date(item.endDate);
          if (endDate < currentDate && item.status !== "inactive") {
            await axios.put(`${url}/api/offer/updateStatus/${item._id}`, {
              status: "inactive",
            });
          }
        }

        // Refetch updated list after status changes
        const updatedResponse = await axios.get(`${url}/api/offer/list`);
        const showData = updatedResponse.data.data.filter((item)=> item.type==='offer')
        setList(showData);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      toast.error("Error fetching the list");
    }
  };


  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/offer/remove`, { id: foodId });
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
      formData.append('price', data.price);
      formData.append('description', data.description);
      formData.append('startDate', data.startDate);
      formData.append('endDate', data.endDate);
      if (data.image) {
        formData.append('image', data.image);
      }

      const response = await axios.put(`${url}/api/offer/update/${foodId}`, formData);

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

  const categories = ['Active', 'inactive'];

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

  const statusHandler = async (event, offerId) => {
    try {
      const response = await axios.put(`${url}/api/offer/updateStatus/${offerId}`, {
        status: event.target.value,
      });
      console.log(response);

      if (response.data.success) {
        await fetchList();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
    }
  };

  return (
    <div className="table-container">
      <h3>Offer List</h3>
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
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, index) => (
            <tr key={index}>
              <td><img src={`${url}/images/${item.image}`} alt={item.name} /></td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.startDate ? new Date(item.startDate).toLocaleDateString() : 'N/A'}</td>
              <td>{item.endDate ? new Date(item.endDate).toLocaleDateString() : 'N/A'}</td>
              <td>Rs.{item.price}</td>
              <td className='status'>
                <select
                  onChange={(event) => statusHandler(event, item._id)}
                  value={item.status || '-'}
                >
                  <option value="Active">Active</option>
                  <option value="inactive">inactive</option>
                </select>
              </td>
              <td>
                <span className="btn-update" onClick={() => { setCurrentItem(item); setIsModalOpen(true); }}>Update</span>
                <span className="btn-remove" onClick={() => removeFood(item._id)}> Remove </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <OfferModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={currentItem}
        onUpdate={updateFood}
        categories={categories}
      />
    </div>
  );
};

export default OffersList;
