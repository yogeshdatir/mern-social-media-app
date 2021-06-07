import { Grow, Container, Grid, AppBar, TextField, Button, Paper } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../actions/postsActions";
import Form from "../Form/Form";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import useStyles from "./styles";

interface Props {}

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = (props: Props) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [currentFileId, setCurrentFileId] = useState(null);
  const classes = useStyles();

  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  // const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<any>([]);

  const searchPost = () => {
    if(search.trim() || tags) {
      dispatch(getPostsBySearch({search, tags: tags.join(',')}));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
    } else {
      history.push('/')
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag: any) => setTags([...tags, tag]);

  const handleDelete = (tagToDelete : any) =>
    setTags(tags.filter((tag: any) => tag !== tagToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts
              setCurrentId={setCurrentId}
              setCurrentFileId={setCurrentFileId}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                onKeyPress={handleKeyPress}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} variant="contained" color="primary" >Search</Button>
            </AppBar>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              setCurrentFileId={setCurrentFileId}
              currentFileId={currentFileId}
            />
            <Paper className={classes.pagination} elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
