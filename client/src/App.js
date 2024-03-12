import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
    const { user } = useContext(Context);
    return (
        <Router>
            <TopBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={user ? <Home /> : <Register />} /> {/* If user already logged in, the no need to register */}
                <Route path="/login" element={user ? <Home /> : <Login />} /> {/* If user already logged in, the no need to login */}
                <Route path="/write" element={user ? <Write /> : <Register />} /> {/* If user already logged in, then can go to write page */}
                <Route path="/settings" element={user ? <Settings /> : <Register />} /> {/* If user already logged in, then can go to settings page */}
                <Route path="/post/:postid" element={<Single />} />
            </Routes>
        </Router>
    );
}

export default App;