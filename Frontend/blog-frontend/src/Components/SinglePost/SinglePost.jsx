/* eslint-disable react/prop-types */
import './SinglePost.css';


const SinglePost = ({ post }) => {
    return (
        <div className="card">
            <img src={`http://localhost:3000/${post.image}`} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>
                <div className="tag-container">
                    {post.tags.map((tag, index) => (
                        <span key={index} className="tag btn btn-primary">#{tag}</span>
                    ))}
                </div>
                <p>{post.user.name}</p>
            </div>
        </div>
    );
};

export default SinglePost;
