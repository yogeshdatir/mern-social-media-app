import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost: any) => API.post("/posts", newPost);
export const updatePost = (id: number, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: number) => API.delete(`/posts/${id}`);
export const likePost = (id: number) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData: any) => API.post("/user/signIn", formData);
export const signUp = (formData: any) => API.post("/user/signUp", formData);
