import PostLoadingComponent from "./PostLoading";
import Posts from "./Posts";
import React, { useEffect, useState } from "react";
import axiosInstance from "../axios";

function PostLists() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/posts/');
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="App">
      <h1>Latest Posts</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}

export default PostLists;
