import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './pages/Dashboard/Dashboard';
import CancelOrders from './pages/CancelOrders/CancelOders';
import Review from './pages/reviews/Review';

const App = () => {
  const url = "http://localhost:4000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content" style={{ display: 'flex' }}>
        <Sidebar />

        <div style={{ flex: 1, overflowY: 'auto', height: 'calc(90vh - 100px)' }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard url={url} />} />
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/cancel" element={<CancelOrders url={url} />} />
            <Route path="/review" element={<Review url={url} />} />
          </Routes>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default App;
