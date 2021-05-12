import * as api from "../api";

// Action Creators
export const getPosts = () => async (dispatch: any) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
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
      dispatch({ type: "CREATE", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
