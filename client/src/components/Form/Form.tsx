import {
  Box,
  Button,
  makeStyles,
  Paper,
  TextField,
  Tooltip,
  TooltipProps,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/postsActions";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CancelIcon from "@material-ui/icons/Cancel";

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
  const uploadRef: any = useRef(null);
  const post = useSelector((state: any) =>
    currentId
      ? state.posts.posts.find((post: any) => post._id === currentId)
      : null
  );
  const [validationError, setValidationError] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");

  const user = JSON.parse(localStorage.getItem("profile") || "{}");

  const history = useHistory();

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
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setCurrentFileId(null);
    setValidationError("");
    uploadRef.current.value = "";
    setSelectedFileName("");
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
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    );
  }

  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
      marginBottom: "-1px",
    },
  }));

  function BootstrapTooltip(props: JSX.IntrinsicAttributes & TooltipProps) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
  }

  return (
    <Paper className={classes.paper} elevation={6}>
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
          <input
            name="selectedFile"
            type="file"
            hidden
            ref={uploadRef}
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
              setSelectedFileName(e.target.files[0].name);
              return setPostData({
                ...postData,
                selectedFile: e.target.files[0],
                selectedFileId: currentFileId ? `${currentFileId}` : "",
              });
            }}
            required
          />
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
            onClick={(e: any) => {
              setValidationError("");
              uploadRef.current.click();
            }}
          >
            Upload
          </Button>
          {selectedFileName && (
            <Box style={{ display: "flex", marginTop: "8px" }}>
              <BootstrapTooltip
                title={selectedFileName}
                placement="top"
                aria-label="add"
              >
                <Typography
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "90%",
                  }}
                >
                  {selectedFileName}
                </Typography>
              </BootstrapTooltip>
              <CancelIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setCurrentId(null);
                  setCurrentFileId(null);
                  setValidationError("");
                  uploadRef.current.value = "";
                  setSelectedFileName("");
                  setPostData({
                    ...postData,
                    selectedFile: "",
                    selectedFileId: "",
                  });
                }}
              />
            </Box>
          )}
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
