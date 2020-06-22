import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/search/animals">Animals</NavLink></li>
            <li><NavLink to="/search/oceans">Oceans</NavLink></li>
            <li><NavLink to="/search/mountains">Mountains</NavLink></li>
        </ul>
    </nav>
);

export default Nav;