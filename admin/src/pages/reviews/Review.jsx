import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Review = ({ url }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch comments when component mounts
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(url + '/api/comment/list');
            if (response.data.success) {
                setComments(response.data.data.reverse());
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle status change
    const handleStatusChange = async (e, commentId) => {
        try {
            const response = await axios.post(url + '/api/comment/update-status', {
                commentId,
                status: e.target.value,
            });
            if (response.data.success) {
                await fetchComments();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="table-container">
            <h2>Comments Review</h2>
            <table className="table table-dark table-striped table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Comment</th>
                        <th>Rating</th>
                        <th>Status</th>
                        {/* <th style={tableHeaderStyle}>Action</th> */}
                    </tr>
                </thead>
                <tbody>
                    {comments.map((comment) => (
                        <tr key={comment._id}>
                            <td >{comment.name}</td>
                            <td >{comment.comment}</td>
                            <td >{comment.rating}</td>
                            {/* <td >{comment.status}</td> */}
                            <td className='status' >
                                <select
                                    value={comment.status}
                                    onChange={(e) => handleStatusChange(e, comment._id)}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Basic styles
// const tableHeaderStyle = {
//   border: '1px solid #ddd',
//   padding: '8px',
//   backgroundColor: '#f2f2f2'
// };

// const tableCellStyle = {
//   border: '1px solid #ddd',
//   padding: '8px'
// };

export default Review;