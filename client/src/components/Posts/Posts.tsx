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
  const posts = useSelector((state: any) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post: any) => (
        <Grid key={post._id} item xs={12} sm={6}>
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
