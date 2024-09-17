import React, { useContext } from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { SetIsLoggedInContext } from '../App'

const Logout = () => {
  const setIsLoggedIn=useContext(SetIsLoggedInContext);
  const navigate=useNavigate();
  const handleLogout=async()=>{
    try{
      const response=await axios.post("http://localhost:3001/logout",{withCredentials:true})
      if(response.status==200){
        setIsLoggedIn(false);
        navigate('/login');
      }
    }
    catch(error){
      console.log("Error logging out")
    }
  }
    const button={backgroundColor: "green",marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'}    
  return (
    <div>
      <Button style={button} variant='contained' onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Logout
