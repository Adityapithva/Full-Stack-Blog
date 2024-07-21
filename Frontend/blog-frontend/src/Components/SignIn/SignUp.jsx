import axios from 'axios';
import {useState,useRef} from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
const SignIn = () => {
    const name =  useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [message,setMessage] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/register',{
                name: name.current.value,
                email: email.current.value,
                password: password.current.value
            });
            if(res.status  === 201){
                setMessage('User registered successfully');
            }
        }catch(err){
            if(err.response){
                setMessage(err.response.data.message);
            }else{
                setMessage('Error registering user');
            }
        }
    }
    return <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <p className="form-title">Create an Account</p>
                <div className="input-container">
                    <input type="text" placeholder="Enter name" ref={name}/>
                    <span />
                </div>
                <div className="input-container">
                    <input type="email" placeholder="Enter email" ref={email}/>
                    <span />
                </div>
                <div className="input-container">
                    <input type="password" placeholder="Enter password" ref={password}/>
                </div>
                <button type="submit" className="submit">
                    Sign Up
                </button>
                <p className="signup-link">
                    Already have account?
                    <Link to='/login'>Log In</Link>
                </p>
                {message && <p>{message}</p>}
            </form>
    </div>
}
export default SignIn;