import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

const socket = io("https://crypto-socket-io.herokuapp.com/");
socket.on('connection')


const AdminDashboard = () => {

    const history = useHistory()
    const userData = JSON.parse(sessionStorage.getItem("logged-user"))
    
    
    socket.on('notification', (data) => {
        store.addNotification({
            title: "New Notification!",
            message: data.name + "\n" + data.email + "\n"+ data.mobile,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 0,
              onScreen: true
            }
          });
       
    })

    const admin = sessionStorage.getItem("logged-user") ? JSON.parse(sessionStorage.getItem("logged-user")) :''

    useEffect(() => {
        if (!admin && !admin.auth) {
            history.push("/admin")
        } else {
            history.push("/dashboard")
        }
    }, [admin,history])
    

    const logoutUser = () => {
        sessionStorage.removeItem('logged-user');
        history.push('/admin')
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="my-3">Welcome  {userData.name}</h4>
                <button className="btn btn-primary " onClick={() => logoutUser()}>Logout</button>
            </div>
           <ReactNotification/>  
        </div>
    )
}

export default AdminDashboard
