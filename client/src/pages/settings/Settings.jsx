import { useContext, useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import { Context } from "../../context/Context"
import "./settings.css"
import axios from "axios"
import { useLocation } from "react-router-dom"

export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:5000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" })
    const updatedUser = {
      userId: user._id,
      username,  //Could also try username:username
      email,
      password,
    };
    if (file) { // If image exists
      const data = new FormData();
      const filename = Date.now() + file.name; // DateNow is given just to give a unique name to image. Else user will be able to upload diff image with same name.
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data })
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" })
      // console.log(err);
    }
  }

  const deleteUser = async () => {
    const data = {
      userId: user._id
    }
  
    try {
      await axios.delete("/users/" + user._id, {data});
      dispatch({ type: "LOGOUT" })
      window.location.replace("/register");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {/* <span className="settingsDeleteTitle">Delete Account</span> */}
          <button onClick={deleteUser}>Delete Account</button>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon fa-solid fa-circle-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
          <label>Password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmit" type="submit">Update</button>
          {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile Updated!</span>}
        </form>
      </div>

      <Sidebar />
    </div>
  )
}