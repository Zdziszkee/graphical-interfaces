import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function MainView() {
    return (
        <Router>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to Our Application</h1>
                <nav>
                    {/* Navigation Links */}
                    <Link to="/" style={{ margin: '0 10px', textDecoration: 'none' }}>
                        Login
                    </Link>
                    <Link to="/register" style={{ margin: '0 10px', textDecoration: 'none' }}>
                        Register
                    </Link>
                </nav>
                <hr />
            </div>
        </Router>
    );
}

export default MainView;
