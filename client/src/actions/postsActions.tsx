import * as api from "../api";
import {
  CREATE,
  UPDATE,
  DELETE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_POST,
} from "../constants/actionTypes";

// Action Creators
export const getPost = (id: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPosts = (page: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (searchQuery: any) => async (dispatch: any) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost =
  (post: {
    title: string;
    message: string;
    selectedFile: any;
    tags: string;
    name: string;
  }) =>
  async (dispatch: any) => {
    try {
      dispatch({ type: START_LOADING });
      let formData = new FormData();
      formData.append("file", post.selectedFile);
      const { data: dataFromImageUpload } = await api.uploadPostImage(formData);
      const { data } = await api.createPost({
        ...post,
        selectedFile: dataFromImageUpload.result.url,
        selectedFileId: dataFromImageUpload.result.fileId,
      });
      dispatch({ type: CREATE, payload: data });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error.message);
    }
  };

export const updatePost =
  (
    id: number,
    post: {
      title: string;
      message: string;
      selectedFile: any;
      selectedFileId: string;
      tags: string;
      name: string;
    }
  ) =>
  async (dispatch: any) => {
    try {
      let formData = new FormData();
      formData.append("file", post.selectedFile);
      const { data: dataFromImageUpload } = await api.uploadPostImage(formData);
      const { data } = await api.updatePost(id, {
        ...post,
        selectedFile: dataFromImageUpload.result.url,
        selectedFileId: dataFromImageUpload.result.fileId,
      });

      await api.deletePostImage(post.selectedFileId);
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const deletePost =
  (id: number, fileId: string) => async (dispatch: any) => {
    try {
      await api.deletePost(id);
      await api.deletePostImage(fileId);
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error.message);
    }
  };

export const likePost = (id: number) => async (dispatch: any) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
