import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Temple from './components/Temples';
import Signup from './components/signup';
import Login from './components/login';
import AddTempleForm from './components/Addtemples';
import UpdateTempleForm from './components/UpdateTempleForm';
import Userdata from './components/Userdata';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/temple" element={<Temple />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/loginpage" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addtemple" element={<AddTempleForm />} />
        <Route path="/temples/:id" element={<UpdateTempleForm />} /> 
        <Route path="/userdata" element={<Userdata />} /> 

      </Routes>
    </div>
  );
};

export default App;
