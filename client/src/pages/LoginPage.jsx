import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser, user} = useContext(AuthContext)
  if (user) {
    return <Navigate to="/login" replace />;
  } else {
    return (
      <div>
        <form onSubmit={loginUser}>
          <input type="text" name="username" id="username" placeholder='enter username' />
          <input type="password" name="password" id="password" placeholder='enter your password' />
          <input type="submit" />
        </form>
      </div>
    )
  }

}

export default LoginPage