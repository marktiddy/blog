import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

//This creates our global context and is simular to redux

const blogReducer = (state, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return action.payload;
    case "DEL_POST":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "ADD_POST":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 9999999),
          title: action.payload.title,
          content: action.payload.title,
        },
      ];
    case "EDIT_POST":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "GET_POSTS", payload: response.data });
  };
};

const addBlogPost = (dispatch) => {
  return async (title, content, callback) => {
    // }
    await jsonServer.post("/blogposts", { title, content });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "DEL_POST", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });
    dispatch({
      type: "EDIT_POST",
      payload: { id, title, content },
    });
    if (callback) {
      callback();
    }
  };
};

//Use our function to create all of this

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
