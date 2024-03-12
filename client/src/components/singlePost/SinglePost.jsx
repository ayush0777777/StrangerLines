import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import "./singlePost.css"
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {
    const location = useLocation();
    console.log(location); //pathname obtained is pathname: "/post/625008204cfc550d805c7759". we need the post id. 
    // console.log(location.pathname.split("/")[2]);
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path]); //Whenever this path changes, fire useEffect

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${post._id}`, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/posts/${post._id}`, {
                username: user.username,
                title, // can also write title:title, desc:desc
                desc,
            });
            // window.location.reload(); -->works, but reloads page
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                    <img className="singlePostImg"
                        src={PF + post.photo}
                        alt=""
                    />
                )}{
                    updateMode ? (
                        <input
                            type="text"
                            value={title}
                            className="singlePostTitleInput"
                            autoFocus
                            onChange={(e) => setTitle(e.target.value)}
                        />) : (

                        <h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username && (

                                <div className="singlePostEdit">
                                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className="singlePostIcon fa-solid fa-trash-can" onClick={handleDelete}></i>
                                </div>
                            )
                            }
                        </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">
                        Author:
                        <Link to={`/?user=${post.username}`} className="link">
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} />
                ) : (
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                )}
                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>Update</button>
                )}
            </div>
        </div>
    )
}
