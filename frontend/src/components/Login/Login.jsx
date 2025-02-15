import React from 'react'
import './Login.css'
import axios from 'axios'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { MenuContext } from '../../context/MenuContext'

const Login = ({ setShowLogin }) => {
 
    const { url,setToken } = useContext(MenuContext)


    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token",response.data.token)
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    return (
        <div className='login'>
            <form action="POST" onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.closeIcon} alt="" />
                </div>
                <div className="login-input">
                    {currState === "Login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Name' required />}
                    <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Example@gmail.com' required />
                    <input type="Password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Password' required />
                </div>
                <button type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className="login-condition">
                    <input type="checkbox" required />
                    <p>by continuing, i agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default Login