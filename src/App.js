import './App.css';
import React from 'react';

import { Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Home from './component/Home';
import Login from './component/Login';
import Navbar from './component/Navbar';
import Semester from './component/Semester';
import Register from './component/Register';
import Note from './component/Note';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Home />} />
        <Route exact path="/dashboard/:uid" element={<Dashboard />} />
        <Route exact path="/dashboard/upload_marks" element={<Semester />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/dashboard/note" element={<Note />} />
      </Routes>
    </>
  );
}

export default App;
