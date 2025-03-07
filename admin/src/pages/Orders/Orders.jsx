import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Download } from 'lucide-react';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + '/api/order/list');
      if (response.data.success) {
        // Filter out cancelled orders
        const activeOrders = response.data.data.filter(order => order.status !== 'Canceled');
        setOrders(activeOrders.reverse());
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
        await fetchAllOrders(); // Refresh the list after status change
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred while updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders(); // Initial fetch
    const intervalId = setInterval(fetchAllOrders, 5000); // Poll every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
}, [url]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Order List', 14, 20);

    const tableColumn = ['#', 'Items', 'Total Items', 'Amount', 'Customer Name', 'Address', 'Phone', 'Date', 'Status'];
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
        order.date,
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

  const downloadInvoice = (order) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let yPosition = margin;

    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Cafe 47', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.text('Invoice', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    doc.setFontSize(12);
    doc.text(`Order ID: ${order._id}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Date: ${order.date}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Status: ${order.status}`, margin, yPosition);
    yPosition += 20;

    doc.setFont('helvetica', 'bold');
    doc.text('Item', margin, yPosition);
    doc.text('Size', margin + 40, yPosition);
    doc.text('Qty', margin + 80, yPosition);
    doc.text('Price', margin + 120, yPosition);
    yPosition += 5;
    doc.line(margin, yPosition, margin + 140, yPosition);
    yPosition += 5;

    doc.setFont('helvetica', 'normal');
    order.item.forEach((item) => {
      doc.text(item.name, margin, yPosition);
      doc.text(item.size, margin + 40, yPosition);
      doc.text(String(item.quantity), margin + 80, yPosition);
      doc.text(String(item.price), margin + 120, yPosition);
      yPosition += 10;
    });

    yPosition += 5;
    doc.line(margin, yPosition, margin + 140, yPosition);
    yPosition += 10;

    doc.setFont('helvetica', 'bold');
    doc.text('Total Amount:', margin, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(`Rs. ${order.amount}.00`, margin + 50, yPosition);

    yPosition += 20;
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Thank you for choosing Cafe 47!', pageWidth / 2, yPosition, { align: 'center' });
    doc.text('Contact us: cafe47@example.com | +91-123-456-7890', pageWidth / 2, yPosition + 10, { align: 'center' });

    doc.save(`invoice_${order._id}.pdf`);
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
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Items</th>
            <th>Total Items</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Invoice</th>
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
              <td>{order.payment}</td>
              <td>
                {order.address.firstName} {order.address.lastName}
              </td>
              <td>{order.address.city}, {order.address.address}</td>
              <td>{order.address.phone}</td>
              <td>{order.date}</td>
              <td> 
                <button className='btn btn-success btn-sm' onClick={() => downloadInvoice(order)}>
                  <Download/>
                </button>
              </td>
              <td className='status'>
                <select 
                  onChange={(event) => statusHandler(event, order._id)} 
                  value={order.status || 'Food Processing'}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Canceled">Canceled</option>
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