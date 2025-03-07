import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({url}) => {
    const [dashboardData, setDashboardData] = useState({
        customerCount: 0,
        foodCount: 0,
        orderCount: 0,
        profit: 0,
        loss: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data when component mounts
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                
                // Fetch users count
                const usersResponse = await axios.get(url +'/api/user/list');
                const foodsResponse = await axios.get(url +'/api/food/list');
                const ordersResponse = await axios.get(url +'/api/order/list');

                // Calculate profit and loss from orders
                const orders = ordersResponse.data.data;
                const profit = orders
                    .filter(order => order.payment === true && order.status === 'Delivered')
                    .reduce((sum, order) => sum + order.amount, 0);
                
                // Assuming loss is from unpaid/canceled orders
                const loss = orders
                    .filter(order => order.payment === true && order.status === 'Canceled')
                    .reduce((sum, order) => sum + order.amount, 0);

                setDashboardData({
                    customerCount: usersResponse.data.data.length,
                    foodCount: foodsResponse.data.data.length,
                    orderCount: orders.length,
                    profit: profit,
                    loss: loss
                });
            } catch (err) {
                setError('Failed to fetch dashboard data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    // Card component for each metric
    const StatCard = ({ title, value, color }) => (
        <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center',
            minWidth: '200px'
        }}>
            <p style={{ 
                color: color || '#333', 
                fontSize: '24px', 
                fontWeight: 'bold',
                margin: 0 
            }}>{value}</p>
            <p style={{ color: '#666', margin: '0 0 10px 0' }}>{title}</p>
        </div>
    );

    if (loading) return <div>Loading dashboard...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div style={{
            padding: '20px',
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            <h1 style={{
                color: '#333',
                marginBottom: '30px'
            }}>Dashboard</h1>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px'
            }}>
                <StatCard 
                    title="Total Customers" 
                    value={dashboardData.customerCount}
                    color="#2ecc71"
                />
                <StatCard 
                    title="Total Food Items" 
                    value={dashboardData.foodCount}
                    color="#3498db"
                />
                <StatCard 
                    title="Total Orders" 
                    value={dashboardData.orderCount}
                    color="#e67e22"
                />
                <StatCard 
                    title="Profit" 
                    value={'Rs. '+dashboardData.profit.toLocaleString()}
                    color="#27ae60"
                />
                <StatCard 
                    title="Loss" 
                    value={'Rs. '+dashboardData.loss.toLocaleString()}
                    color="#e74c3c"
                />
            </div>
        </div>
    );
};

export default Dashboard;