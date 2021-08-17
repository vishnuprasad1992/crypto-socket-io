import axios from 'axios';
import { io } from "socket.io-client";
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const socket = io("https://crypto-socket-io.herokuapp.com/");
socket.on('connection')

const Home = () => {

    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [message, setMessage] = useState("");

    const dataUrl = 'https://crypto-socket-io.herokuapp.com/api/data'

    useEffect(() => {
        if (!sessionStorage.getItem("logged-user")) {
            history.push("/")
        } else {
            history.push("/home")
        }
    }, [history])

    const userData = JSON.parse(sessionStorage.getItem("logged-user"))

    const sendData = async (e) => {
        e.preventDefault();
        const details = {
            name,
            email,
            mobile,
        }
        if (!details) {
            return alert("Please fill the credentials")
        } else {
            try {
                await axios.post(dataUrl, details)
                    .then(res => {
                        if (res.data.status === "success") {
                            setMessage(res.data.message)

                            const sentMessage = (details)=>{
                                socket.emit('notification',details)
                            }
                            sentMessage(details)
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
            } catch (error) {
                console.log(error.message);
            }
        }


        setMobile('');
        setEmail('');
        setName('');
        setTimeout(() => {
            setMessage('')
        }, 5000);
    }
    const logoutUser = () => {
        sessionStorage.removeItem('logged-user');
        history.push('/')
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
            <h4 className="my-3">Welcome  {userData.name}</h4>
            <button className="btn btn-primary " onClick={() => logoutUser()}>Logout</button>
            </div>
            <div className='row justify-content-center align-items-center mt-5'>
                <div className="col-lg-5 col-md-9 border col-sm-12">
                    <h5 className="my-3 text-primary">Please Enter the following details</h5>
                    <form onSubmit={sendData}>
                        {message && <p className="alert alert-success my-2" >{message}</p>}
                        <div className="mb-3 text-start">
                            <label htmlFor="name" className="form-label">Name</label>
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
                            <label htmlFor="email" className="form-label">Email</label>
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
                            <label htmlFor="mobile" className="form-label">Mobile</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobile"
                                placeholder="mobile"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn my-3 btn-primary text-center ">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home
