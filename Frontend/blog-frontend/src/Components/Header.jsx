import './Header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Header = () => {
    const [selectedTab,setSelectedTab] = useState('home');
    return <>
        <header className="d-flex justify-content-center py-3 header">
            <ul className="nav nav-pills">
                <li className="nav-item"><a href="#" className={`nav-link ${selectedTab === 'home' ? 'active' : ''}`} aria-current="page" onClick={() => setSelectedTab('home')}>Home</a></li>
                <li className="nav-item"><Link to="/createpost" className={`nav-link ${selectedTab === 'createpost' ? 'active' : ''}`} onClick={() => setSelectedTab('createpost')}>Create Post</Link></li>
                <li className="nav-item"><a href="#" className={`nav-link ${selectedTab === 'yourpost' ? 'active' : ''}`} onClick={() => setSelectedTab('yourpost')}>Your Posts</a></li>
            </ul>
        </header>
    </>
}
export default Header;