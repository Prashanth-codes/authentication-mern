import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button, Grid,Paper,TextField, Typography} from '@mui/material';
import axios from "axios";
const Signup = () => {

    const paperStyle = {padding: "2rem", margin: "100px auto", borderRadius:"1rem", boxShadow: "10px 10px 10px"};
    const heading = {fontSize:"2.5rem", fontWeight:"600"}
    const row = {display:"flex", marginTop:"2rem"}
    const btnstyle={marginTop:"2rem", fontSize:"1.2rem", fontWeight:"700", backgroundColor:"blue", borderRadius:"0.5rem"};


    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();


    const handleSignup = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:3001/signup",{name,email,password})
        .then(res=>{
            if(res.status==201){
                console.log("User created succesfully");
                navigate("/login");
            }
        })
        .catch(err=>{
            if(err.response && err.response.status===400){
                window.alert("email already exist");
            }
            else{
                console.log(err);
            }
        })
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
            <Typography style={heading}>Signup</Typography>
            <form onSubmit={handleSignup}>
                <TextField onChange={(e)=>setName(e.target.value)} name='name' required style={row} label="Enter Name" type="text"></TextField>
                <TextField onChange={(e)=>setEmail(e.target.value)} name='email' required style={row} label="Enter email" type="email"></TextField>
                <TextField onChange={(e)=>setPassword(e.target.value)} name='password' required style={row} label="Enter Password" type="password"></TextField>
                <Button type="submit" variant='contained' style={btnstyle}>Signup</Button>
            </form>
            </Paper>
        </Grid>
    </>
  )
}

export default Signup
