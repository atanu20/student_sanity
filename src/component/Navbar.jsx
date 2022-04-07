import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Stu1 from '../img/Stu1.png';
const Navbar = () => {
  const nag = useNavigate();
  const User =
    localStorage.getItem('user_sanity') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user_sanity'))
      : localStorage.clear();
  // console.log(User);
  const logout = (e) => {
    nag('/login', { replace: true });
    localStorage.removeItem('user_sanity');
    window.location.reload();
  };
  return (
    <>
      <nav className="fixed-top">
        <NavLink to="/">
          <img src={Stu1} alt="" className="logo" />{' '}
        </NavLink>
        <div>
          {User && (
            <NavLink
              to={`/dashboard/${User?._id}`}
              className="navlink"
              data-toggle="tooltip"
              title="Dashboard"
            >
              <i class="fa fa-user" aria-hidden="true"></i>
            </NavLink>
          )}
          {User ? (
            <span
              onClick={logout}
              className="navlink"
              style={{ cursor: 'pointer' }}
            >
              Logout
            </span>
          ) : (
            <NavLink to="/login" className="navlink">
              Login
            </NavLink>
          )}

          <NavLink to="/register" className="btn btn-outline-light">
            Register
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
