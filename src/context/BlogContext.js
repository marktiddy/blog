import createDataContext from "./createDataContext";

//This creates our global context and is simular to redux

const blogReducer = (state, action) => {
  switch (action.type) {
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

const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    dispatch({ type: "ADD_POST", payload: { title: title, content: content } });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "DEL_POST", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
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
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ id: 1234, title: "Test Post", content: "This is some sample content" }]
);
