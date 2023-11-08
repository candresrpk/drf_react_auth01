import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
  let { user, logOut } = useContext(AuthContext)
  console.log(user)
  return (
    <div>
        <Link to='/'>Home</Link>
        <span> | </span>
        
        {user ? (<p onClick={logOut}>Logout</p>) : (<Link to='/login'>Login</Link>)} 
        <p>{user ? `Welcome ${user.username}`: "Please Loggin"} </p>
    </div>
  )
}

export default Header