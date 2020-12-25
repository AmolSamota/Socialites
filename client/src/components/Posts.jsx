/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Post from "./Post";
import Footer from "./Footer";
import CategoryMenu from "./CategoryMenu";
import Heading from "./Heading";
import SearchBar from "./SearchBar";

const Posts = () => {

    let { username } = useParams();
    var [posts,setPosts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get("/posts/");
                setPosts(response.data.reverse());
            }
            catch (err) {
                console.log(err);
            }
        };
        return fetch(); // OR simple write fetch();
    });

    const createPost = (props, index) => {

        const changepost = (event, post) => {
            const drop = async() => {
                try {
                    const response = await axios.post(`/posts/update/${event.target.name}/${post.name}`, post);
                    console.log(response.data);    
                }
                catch(error) {
                    console.log(error);
                }
            }
            drop();
        }

        return <Post 
                key = {index}
                name = {username}
                _id = {props._id}
                author = {props.author}
                title = {props.title}
                content = {props.content}
                category = {props.category}
                like = {props.like}
                love = {props.love}
                laugh = {props.laugh}
                comment_count = {props.comment_count}
                change = {changepost}
                show_comments={true}
        />
    }

    return (<div>
        <Navbar 
            name = {username}
            page = "home"
        />
        <Heading />
        <div className="center-text">
            <h3 className="margin"> All Posts </h3>
        </div>
        <CategoryMenu
            name = {username}
            category_type = "Select Category"
            message = "all"
        />
        <SearchBar 
            name = {username}
            message = "all"
            type = "none"
        />
        {posts.map(createPost)}
        <div className="space"></div>
        <Footer />
</div>);
}

export default Posts;

