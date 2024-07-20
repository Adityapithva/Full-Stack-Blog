import '../SignIn/SignIn.css';
import axios from 'axios';
import {useRef,useState} from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
const LogIn = () => {
    const [message, setMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let email = useRef(null);
    let password = useRef(null);
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/login',{
                email:email.current.value,
                password: password.current.value
            });
            if(res.status === 200){
                setMessage('Login successful');
                localStorage.setItem('token', res.data.token);
                setIsLoggedIn(true);
            }
        }catch(err){
            if(err.response){
                setMessage(err.response.data.message);
            }else{
                setMessage('Error logging in');
                console.log(err);
                
            }
        }
    };
    return <div className="container">
    <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Sign In to your Accout</p>
        <div className="input-container">
            <input type="email" placeholder="Enter email" ref={email}/>
            <span />
        </div>
        <div className="input-container">
            <input type="password" placeholder="Enter password" ref={password}/>
        </div>
        <button type="submit" className="submit">
            Sign in
        </button>
        <p className="signup-link">
            no account?
            <Link to='/signup'>Sign Up</Link>
        </p>
        {message && <p>{message}</p>}
    </form>
    {isLoggedIn && <Navigate to="/home" replace />}
</div>
}
export default LogIn;