export const createBlog = (blog) => {
  console.log(blog);
  return {
    type: 'CREATE_BLOG',
    blog: {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      likes: blog.likes,
      user: blog.user,
    },
  };
};

export const initBlog = (blogs) => {
  return {
    type: 'INIT_BLOG',
    blog: blogs,
  };
};

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG':
      return action.blog;
    case 'CREATE_BLOG':
      return [...state, action.blog];
    default:
      return state;
  }
};

export default blogReducer;
