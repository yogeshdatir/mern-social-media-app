import * as api from "../api";
import { CREATE, UPDATE, DELETE, FETCH_ALL } from "../constants/actionTypes";

// Action Creators
export const getPosts = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost =
  (post: {
    creator: string;
    title: string;
    message: string;
    selectedFile: string;
    tags: string;
  }) =>
  async (dispatch: any) => {
    try {
      const { data } = await api.createPost(post);
      dispatch({ type: CREATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

export const updatePost =
  (
    id: number,
    post: {
      creator: string;
      title: string;
      message: string;
      selectedFile: string;
      tags: string;
    }
  ) =>
  async (dispatch: any) => {
    try {
      const { data } = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deletePost = (id: number) => async (dispatch: any) => {
    try {
      await api.deletePost(id);
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
