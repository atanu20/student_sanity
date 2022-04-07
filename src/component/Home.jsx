import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="mainbox">
          <h5 class="title_one">EDUCATION &amp; SCHOOL</h5>
          <h1 class="title_two">SHOWCASE COURSES, EVENTS AND MORE!</h1>
          <h5 class="title_one">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </h5>
          <NavLink to="/login" className="btn btn-outline-light newtex">
            Login Now
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
