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
          title: `Blog Post #${state.length + 1}`,
        },
      ];
    default:
      return state;
  }
};

const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: "ADD_POST" });
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    dispatch({ type: "DEL_POST", payload: id });
  };
};

//Use our function to create all of this

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  []
);
