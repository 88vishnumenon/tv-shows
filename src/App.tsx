import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom";


// component imports
import Dashboard from './components/dashboard/dashboard';
import Header from './components/header/header';


function App() {
  return (
    <>
    <Header></Header>
    <Routes>
    <Route path="/" element={<Dashboard></Dashboard>} />
</Routes>
</>
  );
}

export default App;
