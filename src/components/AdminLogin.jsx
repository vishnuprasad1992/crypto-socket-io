import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {

    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const loginURL = 'https://crypto-socket-io.herokuapp.com/api/user/login'


    useEffect(() => {
        if (!sessionStorage.getItem("logged-user")) {
            history.push("/admin")
        } else if(JSON.parse(sessionStorage.getItem("logged-user")).auth) {
            history.push("/dashboard")
        }else{
            history.push("/admin")
        }
    }, [history])

    const loginUser = async (e) => {
        e.preventDefault();
        const userData = {
            email,
            password
        }
        if (!userData) {
            return alert("Please fill the credentials")
        } else {
            try {
                await axios.post(loginURL, userData)
                    .then(res => {
                        if (res.data.status === "success") {
                            sessionStorage.setItem('logged-user', JSON.stringify(res.data.authUser))
                            window.location.href="/dashboard"
                            // history.push('/dashboard')
                        } else {
                            setErrorMessage('invalid credentials')
                        }
                    })
                    .catch(err => {
                        if (err.message === "Request failed with status code 401") {
                            setErrorMessage('invalid credentials')
                        } else {
                            setErrorMessage('Server Error')
                        }
                    })
            } catch (error) {
                if (error.message === "Request failed with status code 401") {
                    setErrorMessage('invalid credentials')
                }
                else {
                    setErrorMessage('Server Error')
                }
            }
        }
        setTimeout(() => {
            setErrorMessage('')
        }, 5000);
    }


    return (
        <div className="container ">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-5 col-md-12 my-5 border border-info rounded" style={{ backgroundColor: 'lightblue' }}>
                    <h1 className="text-center my-3" >Admin Login</h1>
                    {errorMessage && <p className="alert alert-danger text-center my-2" >{errorMessage}</p>}
                    <form onSubmit={loginUser}>
                        <div className="mb-3 text-start">
                            <label htmlFor="email" className="form-label">Enter your email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn my-3 btn-primary text-center ">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
