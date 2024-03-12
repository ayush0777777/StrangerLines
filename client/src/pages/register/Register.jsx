import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // To not refresh the page when submitting
        setError(false);
        try {
            const res = await axios.post("/auth/register", {
                username: username,   //username, email,password does not work
                email: email,         //Have to write username:username, email:email, password:password
                password: password
            });
            res.data && window.location.replace("/login");
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className="registerForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    minLength={3}
                    className="registerInput"
                    placeholder="Enter your username..."
                    onChange={e => setUsername(e.target.value)}
                />
                <label>Email</label>
                <input
                    type="email"
                    className="registerInput"
                    placeholder="Enter your email..."
                    onChange={e => setEmail(e.target.value)}

                />
                <label>Password</label>
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Enter your password..."
                    required
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,12}$"
                    title = "Must contain atleast 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and length should be minimum 8 and maximum 12"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="registerButton" type="submit">Register</button>
            </form>
            <button className="registerLoginButton">
                <Link className="link" to="/login">Login</Link>
            </button>
            {error && <span style={{ color: "red", marginTop:"10px"}}>Something went wrong!! Either username or email already exists</span>}
        </div>
    )
}
