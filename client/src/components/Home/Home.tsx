import { Grow, Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/postsActions";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

interface Props {}

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={7}>
            <Posts
              setCurrentId={setCurrentId}
              setCurrentFileId={setCurrentFileId}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              setCurrentFileId={setCurrentFileId}
              currentFileId={currentFileId}
            />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
