import  { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Header/Header';
import SinglePost from '../SinglePost/SinglePost';
import './Home.css';
const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return  <>
        <Header></Header>
        <div className="home">
            <div className="posts">
                {posts.map((post) => (
                    <SinglePost post={post} key={post._id}></SinglePost>
                ))}
            </div>
        </div>
   </>
};

export default Home;
