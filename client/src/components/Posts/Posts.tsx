import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post/Post";

import useStyles from "./styles";

interface Props {
  setCurrentId: (prevState: any) => void;
  setCurrentFileId: (prevState: any) => void;
}

const Posts = ({ setCurrentId, setCurrentFileId }: Props) => {
  const {posts, isLoading} = useSelector((state: any) => state.posts);
  const classes = useStyles();

  if (!posts.length && !isLoading) return <>No posts</>;

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post: any) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post
            post={post}
            setCurrentId={setCurrentId}
            setCurrentFileId={setCurrentFileId}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
