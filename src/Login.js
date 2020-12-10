import React, { useState } from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import './Login.css';
import "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase';
import { useHistory } from 'react-router-dom';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig)
}


export function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        inSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    const history = useHistory()

    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photoURL: photoURL

                }
                setUser(signedInUser)
                console.log(displayName, email, photoURL)
            })
            .catch(err => {
                console.log(err)
                console.log(err.message)
            })

    }

    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    photo: '',
                    email: '',
                    error: '',
                    success: false
                }
                setUser(signedOutUser);

            })
            .catch(err => {
                console.log(err);
                console.log(err.message)
            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === "email") {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value)

        }
        if (e.target.name === "password") {
            const isPasswordValid = e.target.value.length > 6
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }

    }

    const handleSubmit = (e) => {
        console.log(user.name, user.email)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    console.log(newUserInfo)
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name)
                    console.log('sign up user info', res.user)
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log('sign in user info', res.user)
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                });
        }
        e.preventDefault();
    }

    const updateUserName = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,
           
        }).then(function () {
           console.log("user name updated successfully")
        }).catch(function (error) {
            console.log(error)
        });
    }

    const handleProceedSubmit = () => {
        history.push('/home')
    }


    return (
        <div className="login__page">
            <h1><TwitterIcon className="login__twitterIcon" /></h1>
            <h2>Log in to twitter</h2>

            <div className="log2">
                <form onSubmit={handleSubmit}>
                    {
                        newUser && <div className="box1">
                            <label>Your Name</label>
                            <input type="text" name="name" onBlur={handleBlur} required />
                        </div>
                    }
                    <div className="box1">
                        <label>Phone, Email or Username</label>
                        <input type="text" name="email" onBlur={handleBlur} required />
                    </div>
                    <div className="box1">
                        <label>Password</label>
                        <input type="Password" name="password" onBlur={handleBlur} required />
                    </div>
                    <input onClick={handleProceedSubmit} className="button" type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
                    <div className="log">
                        {
                            user.isSignedIn ? <h2 className="text-center"><button onClick={handleSignOut}>sign out</button></h2> :
                                <h2 className="text-center"><button onClick={handleSignIn}>sign in</button></h2>
                        }

                        <p><a href="#"> Forgot Password? * </a>
                            <a href="#" onClick={() => setNewUser(!newUser)}> Sign up for Twitter *</a>
                        </p>
                    </div>

                </form>

                {/* {
                           user.isSignedIn && <div><p>welcome, {user.name}</p></div>
                       } */}
                <p style={{ color: "red" }}>{user.error}</p>
                {
                    user.success && <p style={{ color: "green" }}>User {newUser ? 'created' : 'Logged In'} Successfully</p>
                }
            </div>
        </div>
    )
}
