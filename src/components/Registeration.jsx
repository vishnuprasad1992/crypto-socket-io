import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios'

const Registeration = () => {

    const history = useHistory();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [message,setMessage] = useState("");
    const [errorMessage,setErrorMessage] = useState("");

    const registerURL = 'https://crypto-socket-io.herokuapp.com/api/user/registeration';

    useEffect(() => {
        if (sessionStorage.getItem("logged-user")) {
            history.push("/home")
        }
    }, [history])

    const regiterUser = async (e) => {
        e.preventDefault();
        const userData = {
            name,
            email,
            password,
            cPassword
        }
        if (!userData) {
            return alert("Please fill the credentials")
        }
        if (userData.password === userData.cPassword) {
            try {
                await axios.post(registerURL, userData)
                    .then(res => {
                        if(res.data.status === "success"){
                            setMessage(res.data.message)
                        }else{
                            console.log(res);
                            setErrorMessage(res.data.message)
                        }
                    })
                    .catch(err => {
                        if(err.message === "Request failed with status code 401"){
                            setErrorMessage('Registeration Error')
                        }else{
                            setErrorMessage('Server Error')
                        }
                    })
            } catch (error) {
                if(error.message === "Request failed with status code 401"){
                    setErrorMessage('Registeration Error')
                }
                else{
                    setErrorMessage('Server Error')
                }
            }
        } else {
            return alert("Passwords not matching")
        }
        setCPassword('');
        setEmail('');
        setName('');
        setPassword('')
        setTimeout(() => {
            setMessage('')
            setErrorMessage('')
        }, 5000);
    }

    return (
        <div className="container ">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-5 col-md-12 my-5 border border-info rounded" style={{ backgroundColor: 'lightblue' }}>
                    <h1 className="text-center my-3" >Register</h1>
                    {message && <p className="alert alert-success my-2" >{message}</p>}
                    {errorMessage && <p className="alert alert-danger my-2" >{errorMessage}</p>}
                    <form onSubmit={regiterUser}>
                        <div className="mb-3 text-start">
                            <label htmlFor="name" className="form-label">Enter your Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="mb-3 text-start">
                            <label htmlFor="cpassword" className="form-label">Confirm Password(minimum 6 characters)</label>
                            <input
                                type="password"
                                className="form-control"
                                id="cpassword"
                                placeholder="confirm password"
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary text-center ">Submit</button>
                        <div className="my-3 text-start">
                            <span >I have an account,
                                <Link className="ms-1" to="/">
                                    Login
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registeration
