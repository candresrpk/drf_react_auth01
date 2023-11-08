import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    const token = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    const decodeToken = `${token ? jwtDecode(token.access) : null}`
    let [authTokens, setAuthTokens] = useState(token)
    let [user, setUser] = useState(decodeToken)
    let [loading, setLoading] = useState(true)

    let navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:3000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })

        let data = await response.json()
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else {
            alert('something went wrong! ')
        }
    }

    let logOut = () => {
        setAuthTokens()
        setUser()
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let updateToke = async () => {
        console.log('executed')
        const response = await fetch('http://localhost:3000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens.refresh})
        })
        let data = await response.json()

        if (response.status === 200) {
            setAuthTokens(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else {
            logOut()
        }
    }

    useEffect( () => {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if(authTokens){
                updateToke()
            }
        }, fourMinutes)

        return ()=> clearInterval(interval)

    }, [authTokens, loading])

    let conTextData = {
        user:user,
        authTokens:authTokens,
        loginUser:loginUser,
        logOut:logOut
    }

    return (
        <AuthContext.Provider value={conTextData}>
            {children}
        </AuthContext.Provider>
    )
}