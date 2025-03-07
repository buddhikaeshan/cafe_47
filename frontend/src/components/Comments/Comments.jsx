import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { MenuContext } from '../../context/MenuContext';
import './Comments.css';

const Comments = () => {
    const { url } = useContext(MenuContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        comment: '',
        rating: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch existing comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${url}/api/comment/list`);
                const comments = response.data.data.filter(comment => comment.status === 'approved');
                setComments(comments.reverse());
            } catch (err) {
                setError('Failed to fetch comments');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [url]);

    const handleInputChange = (e) => {
        setNewComment({ ...newComment, comment: e.target.value });
    };

    const handleRatingChange = (rating) => {
        setNewComment({ ...newComment, rating });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.comment || newComment.rating < 1 || newComment.rating > 5) {
            setError('Please provide a comment and a rating between 1 and 5');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to submit a review');
                return;
            }

            await axios.post(`${url}/api/comment/add`, {
                comment: newComment.comment,
                rating: newComment.rating
            }, {
                headers: { token }
            });

            const response = await axios.get(`${url}/api/comment/list`);
            // setComments(response.data.data);
            setNewComment({ comment: '', rating: 0 });
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit comment');
            console.error(err);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    style={{
                        color: i <= rating ? '#f1c40f' : '#ccc',
                        fontSize: '20px',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleRatingChange(i)}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    // if (loading) return <div>Loading reviews...</div>;
    // if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="comments-container">
            <h1 className="comments-title">Reviews</h1>

            <div className="add-review">
                <h3 className='text-light'>Add Your Review</h3>
                <form onSubmit={handleSubmit}>
                    <div className='d-flex align-items-center '>
                        <label className="rating-label text-light pt-1">Rating:</label>
                        <div className='p-1 rating'>{renderStars(newComment.rating)}</div>
                    </div>
                    <div>
                        <textarea
                            className="review-textarea"
                            value={newComment.comment}
                            onChange={handleInputChange}
                            placeholder="Write your review here..."
                            maxLength={150}
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Submit Review
                    </button>
                </form>
            </div>

            <div className='rating-container'>
                {comments.length === 0 ? (
                    <p className="no-reviews">No reviews yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="comment-card">
                            <div className="comment-header">
                                <p><strong className="comment-name">{comment.name}</strong></p>
                                <span>{renderStars(comment.rating)}</span>
                            </div>
                            <p className="comment-text">{comment.comment}</p>
                            {/* <small className="comment-status">Status: {comment.status}</small> */}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Comments;