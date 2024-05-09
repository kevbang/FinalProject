import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Authorization = () => {
    return (
        <div>
            <div className="one">
                <h1>Kevin's Recipe Book</h1>
                </div>

           <div className="authorization">
            <Login />
            <Register />
        </div> 
        </div>
        
    )
};

const Login = () => {
    const[_, setCookies] = useCookies(["access_token"]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const result = await axios.post("http://localhost:3001/auth/login", {
                username,
                password,
            });
            setCookies("access_token", result.data.token);
            window.localStorage.setItem("userID", result.data.userID);
            navigate("/");
        }
        catch ( error ) {
            console.log(error.message);
        }
    }
    return (
        <div className="auth-container" style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {/* Login Division */}
            <form onSubmit={handleSubmit}>
                <h2 className="loginTitle">Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
      
    };


    const Register = () => {
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");

        const [_, setCookies] = useCookies(["access_token"]);

        const handleSubmit = async ( event ) => {
            event.preventDefault();

            try{
                const result = await axios.post("http://localhost:3001/auth/register", {
                    username,
                    password,
                });

                setCookies("access_token", result.data.token);

                alert("You have successfully registered! You can log in now.");

            }
            catch (error) {
                console.log(error.message);
            }
        };

    return (
            <div className="auth-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <form onSubmit={handleSubmit}>
                <h2 className="registerTitle">Register</h2>
                <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                </div>
                <button type="submit">Register</button>
            </form>
            </div>
        );
    };
    