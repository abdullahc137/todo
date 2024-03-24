import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from 'react-router-dom';
import './welcome.css';
import TodoSVG from '../assets/todo-svg.svg'

function Welcome() {
    // UseSTATE 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegister, setIsRegister] = useState(false);
    const [regInfo, setRegInfo] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })

    const navigate = useNavigate();
    // UseEffect 
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/homepage');
            }
        }, []);
    });



    // SIGN IN 
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => { navigate('/homepage') })
            .catch((err) => alert(err.message));
    }
    const handleRegister = () => {
        if (regInfo.email !== regInfo.confirmEmail) {
            alert("Please confirm that Email is the same");
            return;
        } else if (regInfo.password !== regInfo.confirmPassword) {
            alert("Please confirm that Password is the same");
            return;
        }

        createUserWithEmailAndPassword(auth, regInfo.email, regInfo.password)
            .then(() => { navigate('/homepage') })
            .catch((err) => alert(err.message));
    };
    return (
        <div className="welcome">
            <img src={TodoSVG} className="todo-svg" />
            <h1>Todo || !Todo</h1>
            <div className="login-register-container">
                {isRegister ? (
                    <>
                        <input type="email" placeholder="Enter Email" value={regInfo.email} 
                        onChange={(e) => setRegInfo({ ...regInfo, email: e.target.value })} />
                        <input type="email" placeholder="Confirm Email" value={regInfo.confirmEmail} 
                        onChange={(e) => setRegInfo({ ...regInfo, confirmEmail: e.target.value })}/>
                        <input type="password" placeholder="Enter Password" value={regInfo.password} 
                        onChange={(e) => setRegInfo({ ...regInfo, password: e.target.value })}/>
                        <input type="password" placeholder="Confirm Password" value={regInfo.confirmPassword}
                        onChange={(e) => setRegInfo({ ...regInfo, confirmPassword: e.target.value })}/>

                        <button  className="sign-in-register-button" onClick={handleRegister}>Register</button>
                        <button  className="create-account-button" onClick={() => setIsRegister(false)}>Go Back</button>
                    </>
                ) : (
                    <>
                        <input type="email" placeholder='Enter Email' onChange={handleEmailChange} value={email} />
                        <input type="password" placeholder='Enter Password'  onChange={handlePasswordChange} value={password} />
                        <button className="sign-in-register-button" onClick={handleSignIn}>
                            Sign in
                        </button>
                        <button className="create-account-button" onClick={() => setIsRegister(true)}>Create an account</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Welcome
