import Header from '../Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SinglePost from '../SinglePost/SinglePost';

const YourPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                console.log(token);
                
                const response = await axios.get('http://localhost:3000/userpost',{
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

    return (
        <>
            <Header />
            <div className='main'>
                {posts.map(post => <SinglePost key={post._id} post={post} />)}
            </div>
        </>
    );
};

export default YourPosts;
