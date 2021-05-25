import { Input, Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postsActions";
import { toast } from "react-toastify";

interface Props {
  currentId: number | null;
  currentFileId: number | null;
  setCurrentId: (prevState: any) => void;
  setCurrentFileId: (prevState: any) => void;
}

const Form = ({
  currentId,
  currentFileId,
  setCurrentId,
  setCurrentFileId,
}: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state: any) =>
    currentId ? state.posts.find((post: any) => post._id === currentId) : null
  );
  const [validationError, setValidationError] = useState("");

  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
    selectedFileId: "",
  });

  const fileTypesToAccept = ["image/jpeg", "image/png", "image/jpg"];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      postData.title === "" ||
      postData.message === "" ||
      postData.tags === "" ||
      postData.selectedFile === ""
    ) {
      toast.error("Please fill up Title, Message, Tags and Image.");
      return;
    }
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setCurrentFileId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
      selectedFileId: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing a Memory` : `Creating a Memory`}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e: any) =>
            setPostData({ ...postData, title: e.target.value })
          }
          required
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e: any) =>
            setPostData({ ...postData, message: e.target.value })
          }
          required
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e: any) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          required
        />
        <div className={classes.fileInput}>
          <Input
            name="selectedFile"
            type="file"
            onChange={(e: any) => {
              if (
                e.target.files[0] &&
                !fileTypesToAccept.includes(e.target.files[0].type)
              ) {
                setValidationError(
                  "The selected file could not be uploaded. Allowed image extensions are jpeg, jpg, and png."
                );
                return;
              }
              return setPostData({
                ...postData,
                selectedFile: e.target.files[0],
                selectedFileId: currentFileId ? `${currentFileId}` : "",
              });
            }}
            required
          />
          {validationError && (
            <Typography className={classes.errorText}>
              {validationError}
            </Typography>
          )}
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
