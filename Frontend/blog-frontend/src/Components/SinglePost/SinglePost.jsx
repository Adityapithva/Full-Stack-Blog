/* eslint-disable react/prop-types */
import './SinglePost.css';
import Comments from '../Comments/Comments';
import { FaRegComment } from "react-icons/fa";
import { useState } from 'react';
const SinglePost = ({ post }) => {
    const [showComments, setShowComments] = useState(false);
    return (
        <div className="card">
            <img src={`http://localhost:3000/${post.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <div className="tag-container">
                    {post.tags.map((tag,index) => (
                        <span key={index} className="tag btn btn-primary">#{tag}</span>
                    ))}
                </div> 
                <p>{post.user.name}</p>
            </div>
            <FaRegComment onClick={() => setShowComments(!showComments)}/>
            {showComments && <Comments postId={post._id}></Comments>}
        </div>
    );
};

export default SinglePost;
