import { useState, useContext, useEffect } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { MenuContext } from '../../context/MenuContext';
import { assets } from '../../assets/assets';
import jsPDF from 'jspdf';

const MyOrders = () => {
    const { url, token } = useContext(MenuContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(`${url}/api/order/userorders`, {}, { headers: { token } });
    
            if (response.data && response.data.data) {
                setData(response.data.data.reverse());
                console.log(response.data.data);
            } else {
                console.error("Unexpected API response structure:", response.data);
                setData([]); // Set empty array if no data is found
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            setData([]); // Ensure state is not undefined
        }
    };
    

    const cancelOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            try {
                const response = await axios.post(`${url}/api/order/cancel`,
                    { orderId },
                    { headers: { token } }
                );

                if (response.data.success) {
                    setData(prevData => prevData.map(order =>
                        order._id === orderId ? { ...order, status: "Canceled" } : order
                    ));
                    alert("Order canceled successfully!");
                } else {
                    alert(response.data.message || "Failed to cancel order");
                }
            } catch (error) {
                console.error("Error cancelling order:", error);
                alert(error.response?.data?.message || "Failed to cancel order. Please try again.");
            }
        }
    };

    const downloadInvoice = (order) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let yPosition = margin;

        // Header: Shop Name and Title
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text('Cafe 47', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 10;

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text('Invoice', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Line under header
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;

        // Order Details
        doc.setFontSize(12);
        doc.text(`Order ID: ${order._id}`, margin, yPosition);
        yPosition += 10;
        doc.text(`Date: ${order.date}`, margin, yPosition);
        yPosition += 10;
        doc.text(`Status: ${order.status}`, margin, yPosition);
        yPosition += 20;

        // Items Table Header
        doc.setFont('helvetica', 'bold');
        doc.text('Item', margin, yPosition);
        doc.text('Size', margin + 40, yPosition);
        doc.text('Qty', margin + 80, yPosition);
        doc.text('Price', margin + 120, yPosition);
        yPosition += 5;
        doc.line(margin, yPosition, margin + 140, yPosition);
        yPosition += 5;

        // Items List
        doc.setFont('helvetica', 'normal');
        order.item.forEach((item) => {
            doc.text(item.name, margin, yPosition);
            doc.text(item.size, margin + 40, yPosition);
            doc.text(String(item.quantity), margin + 80, yPosition);
            doc.text(String(item.price), margin + 120, yPosition);
            yPosition += 10;
        });

        // Line above total
        yPosition += 5;
        doc.line(margin, yPosition, margin + 140, yPosition);
        yPosition += 10;

        // Total Amount
        doc.setFont('helvetica', 'bold');
        doc.text('Total Amount:', margin, yPosition);
        doc.setFont('helvetica', 'normal');
        doc.text(`Rs. ${order.amount}.00`, margin + 50, yPosition);

        // Footer
        yPosition += 20;
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text('Thank you for choosing Cafe 47!', pageWidth / 2, yPosition, { align: 'center' });
        doc.text('Contact us: cafe47@example.com | +91-123-456-7890', pageWidth / 2, yPosition + 10, { align: 'center' });

        doc.save(`invoice_${order._id}.pdf`);
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div>
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="container">
                    {data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>
                                {order.item.map((item, index) =>
                                    index === order.item.length - 1
                                        ? `${item.name}-${item.size} x ${item.quantity}`
                                        : `${item.name}-${item.size} x ${item.quantity}, `
                                )}
                            </p>
                            <p>Rs. {order.amount}.00</p>
                            <p>Items: {order.item.length}</p>
                            <p>{order.date}</p>
                            <p>
                                <span>●</span> <b>{order.status}</b>
                            </p>
                            {order.status !== "Canceled" && order.status !== "Delivered" && (
                                <button onClick={fetchOrders}>Track Order</button>
                            )}
                            <button onClick={() => downloadInvoice(order)}>Download Invoice</button>
                            {order.status !== "Canceled" && order.status !== "Delivered" && (
                                <button
                                    onClick={() => cancelOrder(order._id)}
                                    className="cancel-button"
                                >
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;