import axios from "axios";

// in case custom header in needed
const axiosConfig = {
  headers: {
    // "Content-Type": "application/json",
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
};
const api = axios.create({
  // dont forget to change the base url to address the server(django is running)
  baseURL: "http://localhost:3000/api",
  // baseURL: "/api",
  // axiosConfig,
});

// the methods are get, post, put(to update), delte
export const createUser = (payload) => api.post(`/user`, payload);
export const getUsers = (payload) => api.get("/users", payload);
export const addPost = (payload) => api.post(`/addpost`, payload);
export const getAllPosts = () => api.get(`/posts/`);
export const getPosts = (company_id) => api.get(`/posts/${company_id}`);
export const getPostById = (post_id) => api.get(`/post/${post_id}`);
export const updatePostById = (post_id, payload) =>
  api.put(`/post/${post_id}`, payload);
export const deletePostById = (post_id) => api.delete(`/post/${post_id}`);
export const searchPosts = (payload) => api.get(`/searchposts/${payload}`);
export const apply = (payload) => api.post(`/apply`, payload);
export const getApplicants = (payload) => api.get(`/getapplicants/${payload}`);
export const updateResult = (payload, _id) =>
  api.post(`/result/${_id}`, payload);

//nope

const apis = {
  createUser,
  getUsers,
  addPost,
  getPosts,
  getPostById,
  updatePostById,
  deletePostById,
  getAllPosts,
  searchPosts,
  apply,
  getApplicants,
  updateResult,
};

export default apis;
