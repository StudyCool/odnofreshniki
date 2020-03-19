import React       from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  return (
    <nav>
      <ul>
        <li><NavLink exact to="/">Text</NavLink></li>
        <li><NavLink to="/login">Sign In</NavLink></li>
        <li><NavLink to="/signup">Sign Up</NavLink></li>
      </ul>
    </nav>
  );
};

export default Navigation;