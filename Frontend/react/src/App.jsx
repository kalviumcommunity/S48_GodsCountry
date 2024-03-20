import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";

// import MainPage from "./component/MainPage";
 import SignUp from "./components/signup";
// import Createuser from "./components/";
// import UpdateUser from "./component/UpdateUser";
import GodsCountry from "./components/LandingPage";
// import Login from "./components/login";

function App(){

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GodsCountry />} />
         <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/create" element={<Createuser/>}/> */}
        {/* <Route path="/update/:id" element={<UpdateUser/>}/>  */}
        <Route path="Login" element= {<Login/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;