import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import './YourPosts.css';

const YourPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/userpost', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPosts(posts.filter(post => post._id !== postId));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Header />
            <div className='container-fluid'>
                {posts.map(post => (
                    <div key={post._id} className="card">
                        <MdDelete className="delete-button" onClick={() => handleDelete(post._id)} />
                        <img src={`http://localhost:3000/${post.image}`} className="card-img-top" alt={post.title} />
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.content}</p>
                            <div className="tag-container">
                                {post.tags.map((tag, index) => (
                                    <span key={index} className="tag btn btn-primary">#{tag}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default YourPosts;
