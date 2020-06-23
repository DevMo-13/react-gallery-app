import React from 'react';
import { NavLink } from 'react-router-dom';

// Nav component renders the links to the deafult search pages.
const Nav = () => (
    <nav className="main-nav">
        <ul>
            <li><NavLink to="/search/mountains">Mountains</NavLink></li>
            <li><NavLink to="/search/animals">Animals</NavLink></li>
            <li><NavLink to="/search/oceans">Oceans</NavLink></li>
        </ul>
    </nav>
);

export default Nav;