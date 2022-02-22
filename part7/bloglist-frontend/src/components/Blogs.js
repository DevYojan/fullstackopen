import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { initBlog } from '../store/reducers/blogReducer';
import blogService from '../services/blogs';

const Blogs = ({ user }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const blogs = await blogService.getAll();
      blogs.map((blog) => {
        blog.visible = false;
      });
      dispatch(initBlog(blogs));
    })();
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs);

  if (!Array.isArray(blogs) || blogs === null) {
    return null;
  }

  return (
    <div className="ui relaxed divided list bloglists">
      {blogs.map((blog) => (
        <div className="item" key={blog.id}>
          <Link className="header" key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
