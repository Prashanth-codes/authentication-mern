import React, {  useContext } from 'react'
import {AppBar,Typography,Toolbar,Button} from '@mui/material';
import {Link} from 'react-router-dom'
import Logout from './Logout'
import {IsLoggedInContext} from '../App';


const Navbar = () => {


  const isLoggedIn = useContext(IsLoggedInContext); 

    const button={backgroundColor: "green-yellow",marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'}
  return (
    <>
        <AppBar sx={{ backgroundColor: 'light-blue' }}>
            <Toolbar>
                <Typography variant="h6" sx={{flexGrow:1}}>Login Signup Authenticaton</Typography>
                {isLoggedIn ? <Logout /> : (
                    <>
                      <Button style={button} variant='contained' to="/login" component={Link}>Login</Button>
                      <Button style={button} variant='contained' to="/signup" component={Link}>Signup</Button>
                    </>
                  )
                }
                
            </Toolbar>
        </AppBar>
    </>
  )
}

export default Navbar
