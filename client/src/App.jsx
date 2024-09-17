import React, { useEffect, useState,createContext } from 'react';
import {BrowserRouter, Navigate, Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import axios from 'axios';


export const IsLoggedInContext=createContext();
export const SetIsLoggedInContext=createContext();

function App() {

  const [isLoggedIn,setIsLoggedIn] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:3001/user",{withCredentials:true})
    .then(response=>{
      if(response.data.user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    })
    .catch(()=>setIsLoggedIn(false))
  },[])

  return (
    <>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
          <BrowserRouter>
            <Navbar />
              <Routes>
                <Route path="/login" element={isLoggedIn?<Navigate to="/home"/>:<Login />}></Route>
                <Route path="/signup" element={isLoggedIn?<Navigate to="/home"/>:<Signup />}></Route>
                <Route path="/home" element={isLoggedIn?<Home />:<Navigate to="/login"/>}></Route>
              </Routes>
          </BrowserRouter>
        </SetIsLoggedInContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  )
}

export default App
