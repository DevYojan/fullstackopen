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

export const getBlog = (blog) => {
  return {
    type: 'GET_BLOG',
    blog,
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

export const addComment = (blog) => {
  return {
    type: 'ADD_COMMENT',
    blog,
  };
};

export const deleteBlog = (blogId) => {
  return {
    type: 'DELETE_BLOG',
    blog: blogId,
  };
};

const blogReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.blog.sort((a, b) => b.likes - a.likes);

    case 'GET_BLOG':
      return action.blog;

    case 'CREATE_BLOG':
      return action.blog;

    case 'LIKE_BLOG':
      return action.blog;

    case 'ADD_COMMENT':
      return action.blog;

    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.blog);

    default:
      return state;
  }
};

export default blogReducer;
