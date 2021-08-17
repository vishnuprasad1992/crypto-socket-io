import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


const Login = () => {
    const history = useHistory()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const loginURL = 'https://crypto-socket-io.herokuapp.com/api/user/login'


    useEffect(() => {
        if (sessionStorage.getItem("logged-user")) {
            history.push("/home")
        } else {
            history.push("/")
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
//                             window.location.href="/home"
                             history.push('/home')
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
                <div className="col-lg-5 col-md-12 my-5 bg-info border border-info rounded">
                    <h1 className="text-center my-3 heading-color" >Login</h1>
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
                        <button type="submit" className="btn btn-primary text-center ">Submit</button>
                    </form>
                    <div className="my-3 text-start">
                        <span >Are you a new user?
                            <Link className="ms-1" to="/register">
                                Register
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
