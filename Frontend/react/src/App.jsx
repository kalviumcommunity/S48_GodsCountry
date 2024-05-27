import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Temple from './components/Temples';
import Footer from './components/Footer';
import CreateUser from './components/signup';
import Log from './components/login';

import './App.css'; 


const App = () => {
  return (
   
      <div>
        <Header />
    
       <Routes>
          <Route exact path="/" component={<Home />}/>
          <Route path="/temple" component={<Temple />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/Loginpage" element={<Log />} />
          <Route path="/create" element={<CreateUser />} />
         
          </Routes>
        <Footer />
      </div>
 
  );
};

export default App;
