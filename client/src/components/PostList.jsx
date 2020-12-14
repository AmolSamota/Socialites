/* eslint-disable jsx-a11y/alt-text */
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import like from "./images/like.png";
import love from "./images/love.png";
import laugh from "./images/laugh.png";
import all from "./images/all.png";
import arrow from "./images/arrow.png";
import search from "./images/search.png";

function PostList() {

    let { username } = useParams();
    var [searchContent,setsearchContent] = useState("");
    var [posts,setPosts] = useState([]);

    useEffect(function() {
        axios.get("/posts") 
            .then(function(response) {
                setPosts(response.data.reverse());
            });
    });

    function createPost(props, index) {

        function change(event) {
            axios.post("/posts/update/" + event.target.name + "/" + username, props)
                .then(function(response) {
                    console.log(response.data);
                });
        }        

        function SeeAll() {
            window.location = "/post/" + username + "/" + props._id;
        }

        return(<div className="container margin post" key={index}> 
            <div className="post-title"> <h2> {props.title} </h2>  by {props.author} </div>
            <div className="post-content"> {props.content} </div>
            <div className="post-info"> 
                <span className="one">
                 <img
                    src={like} 
                    name="like" 
                    onClick={change} 
                    className="expand one"/>
                    <span onClick={SeeAll} > {props.like} </span>
                </span>
                <span className="one">
                 <img 
                    src={love} 
                    name="love" 
                    onClick={change} 
                    className="expand one"/>
                    <span onClick={SeeAll} > {props.love} </span>
                </span>
                <span className="one">
                 <img 
                    src={laugh} 
                    name="laugh" 
                    onClick={change} 
                    className="expand one"/>
                    <span onClick={SeeAll} > {props.laugh} </span>
                </span>
                <span className="one">
                 <img 
                    src={arrow} 
                    name="laugh" 
                    onClick={SeeAll} 
                    className="expand one"/>
                </span>
                <span className="one move-right">
                 <img 
                    src={all} 
                    name="arrow" 
                    onClick={SeeAll} 
                    className="expand one"/> 
                    <span onClick={SeeAll} > {props.laugh + props.love + props.like} </span>
                </span>
            </div>
        </div>);
    }

    function change_search_content(event) {
        setsearchContent(event.target.value);
    }

    var message = "all";
    function searchIt() {
        window.location = "/result/" + username + "/" + searchContent + "/" + message;
    }

    return (<div>
        <Navbar 
            name = {username}
            page = "home"
        />
        <div className="center-text upper-margin">
            <h1 className="main"> Socialites </h1>
            <h2 className="margin"> All Posts </h2>
            <input type="search" placeholder="Search" onChange={change_search_content}/>
            <button className="btn expand" onClick={searchIt}> <img src={search} className="expand"/> </button>
        </div>
        {posts.map(createPost)}
</div>);
}

export default PostList;

