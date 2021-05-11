import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import useStyles from "./styles";

interface Props {}

const Posts = (props: Props) => {
  const posts = useSelector((state: any) => state.posts);
  const classes = useStyles();

  console.log(posts);
  return (
    <>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
};

export default Posts;
