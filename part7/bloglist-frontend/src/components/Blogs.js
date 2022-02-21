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
    <div>
      {blogs.map((blog) => (
        <div className="blog" key={blog.id}>
          <Link className="title" key={blog.id} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
