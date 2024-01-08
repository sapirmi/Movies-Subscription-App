

// function MainPageComp() {



//   return (
//     <>
//       <h1>Movies - Subscriptions Web Site</h1><br/>
//       <h3>Hello {user.username}</h3>
//       <button className="button" onClick={() => navigate(`/movies`)}>Movies</button>&nbsp;&nbsp;
//       <button className="button" onClick={() => navigate(`/members`)}>Subscriptions</button>&nbsp;&nbsp;
//       <button className="button" onClick={() => navigate(`/users`)}>Users Managment</button>&nbsp;&nbsp;
//       <button className="button" onClick={() => logout()}>Logout</button>
      
//       <Outlet/>
//     </>
//   )
// }

// export default MainPageComp


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useNavigate } from "react-router-dom"
import {useAuth} from "../auth/authProvider"
import { Button } from '@mui/material';

export default function ButtonAppBar() {

  const navigate = useNavigate()
  const {user, logout} = useAuth()

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/movies" style={{ color: 'white' }}>Movies</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/members" style={{ color: 'white' }}>Subscriptions</Link>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/users" style={{ color: 'white' }}>Users Managment</Link>
          </Typography>
          <Typography sx={{ color: 'white' }}>Hello {user?.username}</Typography>
          <Button onClick={() => logout()} sx={{ color: 'white' }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    <Outlet/>
    </>
  );
}

