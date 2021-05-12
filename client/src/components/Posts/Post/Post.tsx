import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import ThumbUpAltRoundedIcon from "@material-ui/icons/ThumbUpAltRounded";
import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/postsActions";

import useStyles from "./styles";

import defaultImage from "../../../images/sunset.svg";
import moment from "moment";

interface Props {
  post: any;
  setCurrentId: (prevState: any) => void;
}

const Post = ({ post, setCurrentId }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        // image={post.selectedFile}
        image={defaultImage}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "#fff" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizRoundedIcon fontSize="default" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag: any) => `#${tag}`)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {}}>
          <ThumbUpAltRoundedIcon fontSize="small" />
          Like
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deletePost(post._id))}
        >
          <DeleteRoundedIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
