import './CreatePost.css';
import { useRef } from 'react';
import axios from 'axios';
import Header from './Header';

const CreatePost = () => {
    const title = useRef(null);
    const content = useRef(null);
    const tags = useRef(null);
    const image = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post('http://localhost:3000/createpost',{
                title:title.current.value,
                content: content.current.value,
                tags: tags.current.value.split(' '),
                image: image.current.files[0],
            } , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        title.current.value = '';
        content.current.value = '';
        tags.current.value = '';
        image.current.value = null;
    };

    return (
        <>
            <Header />
            <div className='main'>
                <div className="form-container">
                    <h2>Create Your Post</h2>
                    <form className="styled-form" onSubmit={handleSubmit}>
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" name="title" required ref={title} />

                        <label htmlFor="content">Content:</label>
                        <textarea id="content" name="content" ref={content}></textarea>

                        <label htmlFor="tags">Tags (separated by spaces):</label>
                        <input type="text" id="tags" name="tags" ref={tags} />

                        <label htmlFor="image">Image:</label>
                        <input type="file" id="image" name="image" accept="image/*" ref={image} />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
