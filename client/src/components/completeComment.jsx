/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import liked from "./images/like.png";
import loved from "./images/love.png";
import laughed from "./images/laugh.png";
import trash from "./images/trash.png";

function CompleteComment() {
    let { username,commentId,id } = useParams();

    var [comment, setComment] = useState({});

    var [like,setlike] = useState(false);
    var [love,setlove] = useState(false);
    var [laugh,setlaugh] = useState(false);
    var [reactions,setreactions] = useState([]);
    var [allreactions,setallreactions] = useState([]);

    useEffect(() => {
        axios.get("/posts/getcomment/" + commentId + "/" + id)
            .then((response) => {
                console.log(response.data);
                setComment(response.data)
                setallreactions(response.data.reacts.reverse());
                setreactions(response.data.reacts.reverse());
            })
            .catch((response) => {
                console.log(response.data);
            });
    },[commentId, id]);

    function changeLike(event) {
        if(!like) {
            setlike(true);    
            setlove(false);
            setlaugh(false);
            setreactions(allreactions.filter(function(reaction) {
                return (reaction.type === "likes");
            }));
        }
    }
    function changeLove() {
        if(!love) {
            setlike(false);    
            setlove(true);
            setlaugh(false);
            setreactions(allreactions.filter(function(reaction) {
                return (reaction.type === "loves");
            }));
        }
    }
    function changeLaugh() {
        if(!laugh) {
            setlike(false);    
            setlove(false);
            setlaugh(true);
            setreactions(allreactions.filter(function(reaction) {
                return (reaction.type === "laughs");
            }));
        }
    }

    function changeAll() {
        setlike(false);    
        setlove(false);
        setlaugh(false);
        setreactions(allreactions);
    }

    var style1 = (like) ? {backgroundColor: "white"}:{backgroundColor: "rgb(211, 115, 36)"}
    var style2 = (love) ? {backgroundColor: "white"}:{backgroundColor: "rgb(211, 115, 36)"}
    var style3 = (laugh) ? {backgroundColor: "white"}:{backgroundColor: "rgb(211, 115, 36)"}
    var style4 = (!like && !love && !laugh) ? {backgroundColor: "white"}:{backgroundColor: "rgb(211, 115, 36)"} 

    function remove() {
        axios.post("/posts/remove/" + id, comment) 
            .then((response) => {
                console.log(response.data);
                window.location = "/comment/" + username + "/" + comment._id + "/" + id;        
            })
            .catch((err) => {
                console.log(err);
            });
    }


    var styling = (comment.name === username) ? {visibility: "visible"} : {visibility: "hidden"};

    function renderUsers(props, index) {
        return (<div className="container user" key={index}>
            <li> {props.name} </li>
        </div>);
    }

    return (<div>
    <Navbar 
        name = {username}
        page = "comment"
    />
    <div className="upper-margin container">
        <div className="center-text"> <h1 className="main"> Socialites </h1> </div>
        <div className="container margin">
        <div className="comment-name">
            <div> 
                <span className="name"> {comment.name} </span>
            </div>
            <div>
                <span className="move-right"> 
                    <span className="one">
                        <img src={liked} className="one"/> {comment.likes}
                    </span>
                    <span className="one">
                        <img src={loved} className="one"/> {comment.loves}
                    </span>
                    <span className="one">
                        <img src={laughed} className="one"/> {comment.laughs}
                    </span>
                </span> 
            </div>
        </div>
        <div className="comment-content"> {comment.content} </div>            
        <div className="comment-options center-text" style={styling}>
            <img src={trash} onClick={remove} className="expand one"/>
        </div>
    </div>
        <div className="margin center-text">
            <h2> Users who reacted: </h2>
            <button className="btn expand margin one allbtn" onClick={changeAll} style={style4}> All </button> 
            <button className="btn expand margin one" onClick={changeLike} style={style1}> <img src={liked} name="like" className="expand"/> </button> 
            <button className="btn expand margin one" onClick={changeLove} style={style2}> <img src={loved} name="love" className="expand"/> </button> 
            <button className="btn expand margin one" onClick={changeLaugh} style={style3}> <img src={laughed} name="laugh" className="expand"/> </button> 
        </div>
        <div className="margin">
            {reactions.map(renderUsers)}    
        </div>
    </div>    
    <div className="space"></div>
    <Footer />
</div>);
}

export default CompleteComment;
