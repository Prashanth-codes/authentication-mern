import React, { useContext, useState } from 'react'
import {Button, Grid,Paper,TextField, Typography, useScrollTrigger} from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { SetIsLoggedInContext } from '../App';


const Login = () => {

  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const paperStyle = {padding: "2rem", margin: "100px auto", borderRadius:"1rem", boxShadow: "10px 10px 10px"};
    const heading = {fontSize:"2.5rem", fontWeight:"600"}
    const row = {display:"flex", marginTop:"2rem"}
    const btnstyle={marginTop:"2rem", fontSize:"1.2rem", fontWeight:"700", backgroundColor:"blue", borderRadius:"0.5rem"};
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();


    const handleLogin = (e)=>{
      e.preventDefault();
      axios.post("http://localhost:3001/login",{email,password},{withCredentials:true})
      .then(result=>{
        if(result.data==="Success"){
          axios.get("http://localhost:3001/user",{withCredentials:true})
          .then(res=>{
            if(res.data.user){
              setIsLoggedIn(true);
              navigate('/home',{state: {user: res.data.user}});
            }
          })
        } 
        else{
          alert("User doesnt exist");
        }
      })
      .catch(err=> console.log(err));
    }

  return (
    <>
      <Grid align="center">
            <Paper style={paperStyle} sx={{width:{
                xs:"80vw",
                sm: '50vw',     
                md: '40vw',     
                lg: '30vw',     
                xl: '20vw', 
            },height: '60vh'}}>
            <Typography style={heading}>Login</Typography>
            <form onSubmit={handleLogin}>
                <TextField onChange={(e)=>setEmail(e.target.value)} style={row} label="Enter email" type="email"></TextField>
                <TextField onChange={(e)=>setPassword(e.target.value)} style={row} label="Enter Password" type="password"></TextField>
                <Button type="submit" variant='contained' style={btnstyle}>Sign in</Button>
            </form>
            </Paper>
        </Grid>
    </>
  )
}

export default Login
