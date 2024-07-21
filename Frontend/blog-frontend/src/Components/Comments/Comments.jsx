/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './Comments.css'; // Import CSS for styling

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const commentRef = useRef(null);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/posts/${postId}/comments`);
                setComments(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchComments();
    }, [postId]);

    const handleAddComment = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:3000/posts/${postId}/comments`, {
                content: commentRef.current.value
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Clear the textarea after adding the comment
            commentRef.current.value = '';
            // Prepend the new comment to the comments array
            setComments([response.data, ...comments]);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="comments-container">
            <div className="comment-form">
                <textarea ref={commentRef} placeholder="Add a comment" className="comment-textarea" />
                <button onClick={handleAddComment} className="comment-button">Add Comment</button>
            </div>
            <div className="comments-list">
                {comments.length > 0 ? comments.map(comment => (
                    <div key={comment._id} className="comment-item">
                        <p className="comment-author">
                            <strong>{comment.user?.name || 'Unknown'}:</strong>
                        </p>
                        <p className="comment-content">{comment.content}</p>
                    </div>
                )) : <p>No comments yet.</p>}
            </div>
        </div>
    );
};

export default Comments;
