import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req: any) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile") || "{}").token
    }`;
  }
  return req;
});

export const fetchPosts = (page:any) => API.get(`/posts?page=${page}`);
export const fetchPostsBySearch = (searchQuery: any) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createPost = (newPost: any) => API.post("/posts", newPost);
export const uploadPostImage = (image: any) =>
  API.post("/image/uploadImage", image);
export const deletePostImage = (fileId: string) =>
  API.post("/image/deleteImage", { fileId });
export const updatePost = (id: number, updatedPost: any) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: number) => API.delete(`/posts/${id}`);
export const likePost = (id: number) => API.patch(`/posts/${id}/likePost`);

export const signIn = (formData: any) => API.post("/user/signIn", formData);
export const signUp = (formData: any) => API.post("/user/signUp", formData);
