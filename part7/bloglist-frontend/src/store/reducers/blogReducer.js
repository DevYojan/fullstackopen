export const createBlog = (blog) => {
  return {
    type: 'CREATE_BLOG',
    blog: {
      ...blog,
    },
  };
};

export const initBlog = (blogs) => {
  return {
    type: 'INIT_BLOG',
    blog: blogs,
  };
};

export const likeBlog = (blog) => {
  return {
    type: 'LIKE_BLOG',
    blog: {
      ...blog,
    },
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.blog;
    case 'CREATE_BLOG':
      return [...state, action.blog];
    case 'LIKE_BLOG':
      const replacedState = state.map((blog) => {
        if (blog.id === action.blog.id) {
          return action.blog;
        } else {
          return blog;
        }
      });
      return replacedState;

    default:
      return state;
  }
};

export default blogReducer;
