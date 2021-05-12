import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: any) => axios.post(url, newPost);
export const updatePost = (id: number, updatedPost: any) =>
  axios.patch(`${url}/${id}`, updatedPost);
