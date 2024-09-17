import React from 'react'
import { useLocation,Navigate} from 'react-router-dom';


const Home = () => {
  const location = useLocation();
  const user = location.state?.user;
  if(!user){
    return <Navigate to="/login" />;
  }
  return (
    <div style={{color: 'white'}}><h1>Welcome home {user && user.name}</h1></div>
  )
}

export default Home
