import axios from "axios";

const url = "https://memories-node-react.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: any) => axios.post(url, newPost);
export const updatePost = (id: number, updatedPost: any) =>
  axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id: number) => axios.delete(`${url}/${id}`);
export const likePost = (id: number) => axios.patch(`${url}/${id}/likePost`);
