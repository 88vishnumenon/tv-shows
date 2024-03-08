import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";


// component imports
import Dashboard from './components/dashboard/dashboard';


function App() {
  return (
    <Routes>
    <Route path="/" element={<Dashboard></Dashboard>} />
</Routes>
  );
}

export default App;
