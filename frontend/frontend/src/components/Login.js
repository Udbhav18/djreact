import React, { useState, useEffect } from 'react'
import APIService from '../APIService'
import { useCookies } from 'react-cookie'
import { useHistory } from 'react-router-dom'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useCookies(['Token'])
    const [isLogin, setLogin] = useState(true)

    let history = useHistory()

    useEffect(() => {
        if (token['Token']) {
            history.push('/articles')
        }
    }, [token, history])

    const loginbtn = () => {
        APIService.LoginUser({ username, password })
            .then(resp => {resp.token ? setToken('Token', resp.token) : console.log("Invalid Credentials")})
            .catch(err => console.log(err))
    }

    const registerbtn = () => {
        APIService.RegisterUser({ username, password })
            .then(() => loginbtn())
            .catch(err => console.log(err))
    }

    return (
        <div className="App">
            {isLogin ? <h1>Please Login</h1> : <h1>Please Register</h1>}

            <br /><br />
            <div className="mb-3">

                <label htmlFor="username" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" placeholder="Please Enter Username" value={username} onChange={e => setUsername(e.target.value)} />

            </div>
            <div className="mb-3">

                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" placeholder="Please Enter Password" value={password} onChange={e => setPassword(e.target.value)} />

            </div>

            {isLogin ? <button onClick={loginbtn} className="btn btn-primary">Login</button> : <button onClick={registerbtn} className="btn btn-primary">Register</button>}

            <div className="mb-3">
                <br />
                {isLogin ? <h5>To signup, please <button className="btn btn-primary" onClick={() => setLogin(false)}>Click</button> Here </h5>
                    : <h5>To Login with an existing account, please <button className="btn btn-primary" onClick={() => setLogin(true)}>Click</button> Here </h5>}
            </div>
        </div>
    )
}

export default Login
