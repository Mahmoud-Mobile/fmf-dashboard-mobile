import { Get, Post, PostC } from "./Gate";

// login apis
const login = async (data) => {
  return await Post("mobile/auth/login", data, "POST", true);
};
const reset_password = async (data) => {
  return await Post("users/reset-password", data, "POST", true);
};

const otp = async (data) => {
  return await Post("users/verify-otp", data, "POST", true);
};

const change_password = async (data) => {
  return await Post("users/change-password", data, "POST", true);
};

const register = async (data) => {
  return await Post("users/register", data);
};

// profile apis
const profile = async (data) => {
  return await Get("user/profile", data);
};

// payment apis
// chat apis
// subscription apis

// news apis
const news = async (data) => {
  return await Get("news", data);
};
const show_news = async (id, data) => {
  return await Get(`news/${id}`, data);
};

// recommendations apisapis
const recommendations = async (data) => {
  return await Get("recommendations", data);
};
const show_recommendations = async (id, data) => {
  return await Get(`recommendations/${id}`, data);
};

// books apis
const books = async (data) => {
  return await Get("books", data);
};
const show_books = async (id, data) => {
  return await Get(`books/${id}`, data);
};

// video apis
// books apis
// about apis

const categories = async (data) => {
  return await Get("gallery", data);
};

// guests apis
const guests = async (data) => {
  return await Get("guests", data);
};

const getGuestById = async (id, data) => {
  return await Get(`guests/${id}`, data);
};

// events apis
const events = async (data = {}) => {
  return await Get("events", data);
};

const getEventById = async (id, data) => {
  return await Get(`events/${id}`, data);
};

// flights apis
const flights = async (eventId, data) => {
  return await Get(`participants/events/${eventId}/flights`, data);
};

export {
  login,
  register,
  otp,
  reset_password,
  change_password,
  profile,
  categories,
  news,
  show_news,
  recommendations,
  show_recommendations,
  books,
  show_books,
  guests,
  getGuestById,
  events,
  getEventById,
  flights,
};
