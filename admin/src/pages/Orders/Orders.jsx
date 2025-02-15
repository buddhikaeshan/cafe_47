import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error('Error fetching orders');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(url + '/api/order/status', {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Order List', 14, 20);

    const tableColumn = ['#', 'Items', 'Total Items', 'Amount', 'Customer Name', 'Address', 'Phone', 'Status'];
    const tableRows = [];

    orders.forEach((order, index) => {
      const rowData = [
        index + 1,
        order.item.map((item) => `${item.name} x${item.quantity}`).join(', '),
        order.item.length,
        `Rs ${order.amount}`,
        `${order.address.firstName} ${order.address.lastName}`,
        `${order.address.city}, ${order.address.address}`,
        order.address.phone,
        order.status,
      ];
      tableRows.push(rowData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: 'grid',
    });

    doc.save('orders_list.pdf');
  };

  useEffect(() => {
    fetchAllOrders();
    const intervalId = setInterval(fetchAllOrders, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="table-container">
      <h3>Order Page</h3>
      <div className="d-flex justify-content-end">
        <button className="btn btn-success" onClick={generatePDF}> PDF</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Items</th>
            <th>Total Items</th>
            <th>Amount</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>
                {order.item
                  .map((item, idx) => `${item.name}-${item.size} x${item.quantity}${idx < order.item.length - 1 ? ', ' : ''}`)
                  .join('')}
              </td>
              <td>{order.item.length}</td>
              <td>Rs {order.amount}</td>
              <td>
                {order.address.firstName} {order.address.lastName}
              </td>
              <td>{order.address.city}, {order.address.address}</td>
              <td>{order.address.phone}</td>
              <td>
                <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
