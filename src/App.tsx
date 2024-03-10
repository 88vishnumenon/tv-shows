import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";


// component imports
import Dashboard from './components/dashboard/dashboard';
import Header from './components/header/header';
import ShowDetails from './components/show-details/show-details';


function App() {
  return (
    <>
    <Header></Header>
    <Routes>
    <Route path="/" element={<Dashboard></Dashboard>} />
    <Route path="showDetails" element={<ShowDetails></ShowDetails>} />
</Routes>
</>
  );
}

export default App;
