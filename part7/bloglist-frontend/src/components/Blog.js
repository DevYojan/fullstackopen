import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import blogService from '../services/blogs';
import {
  likeBlog,
  deleteBlog,
  getBlog,
  addComment,
} from '../store/reducers/blogReducer';
import {
  removeNotification,
  setNotification,
} from '../store/reducers/notificationReducer';

const Blog = () => {
  const blogId = useParams().id;
  const userId = useSelector((state) => state.login).id;

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const blog = await blogService.getBlog(blogId);
      dispatch(getBlog(blog));
    })();
  }, [dispatch]);

  const blog = useSelector((state) => state.blogs);

  const [comment, setComment] = useState('');

  const handleAddComment = async (event) => {
    event.preventDefault();
    const blogWithAddedComment = {
      ...blog,
      comments: [...blog.comments, comment],
    };

    const modifiedBlogWithAddedcomment = await blogService.modify(
      blogWithAddedComment
    );

    const blogUserID = modifiedBlogWithAddedcomment.user;
    delete modifiedBlogWithAddedcomment.user;
    modifiedBlogWithAddedcomment.user = {};
    modifiedBlogWithAddedcomment.user.id = blogUserID;

    dispatch(addComment(modifiedBlogWithAddedcomment));

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(
      setNotification(
        `comment '${comment}' added successfully.`,
        'success',
        timerID
      )
    );
  };

  const handleLike = async (blogToLike) => {
    const increasedLikeBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    };

    const modifiedBlog = await blogService.modify(increasedLikeBlog);
    const blogUserID = modifiedBlog.user;
    delete modifiedBlog.user;
    modifiedBlog.user = {};
    modifiedBlog.user.id = blogUserID;

    dispatch(likeBlog(modifiedBlog));

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(
      setNotification(`you liked ${blogToLike.title}!`, 'success', timerID)
    );
  };

  const handleDelete = async (blog) => {
    const result = window.confirm(
      `Remove blog '${blog.title}' by ${blog.author}?`
    );

    if (!result) {
      return;
    }

    const response = await blogService.remove(blog.id);

    if (response.status !== 204) {
      const timerID = setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      dispatch(
        setNotification(
          'An error occured while deleting the blog',
          'success',
          timerID
        )
      );
    }

    dispatch(deleteBlog(blog.id));

    const timerID = setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

    dispatch(setNotification('Blog deleted successfully', 'success', timerID));
  };

  if (Array.isArray(blog) || blog === null) {
    return null;
  }

  return (
    <div className="ui segment">
      <div className="title">
        <h4>{blog.title}</h4>
      </div>
      <p className="author">Author: {blog.author}</p>

      <div className="details">
        <p className="likes">
          Likes: <span id="likes">{blog.likes}</span>
          <i
            onClick={() => handleLike(blog)}
            className="ui large thumbs up blue icon likebutton"
            title="Like Blog"
          ></i>
        </p>
        <p>
          Url:{' '}
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </p>
        {blog.user === userId && (
          <button onClick={() => handleDelete(blog)} className="ui button red">
            Delete
          </button>
        )}
      </div>

      <h4>Comments</h4>
      <form action="">
        <p className="ui fluid labeled input">
          <input
            id="comment"
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            placeholder="Type your comment here..."
          />
          <button className="ui button green" onClick={handleAddComment}>
            Add Comment
          </button>
        </p>
      </form>
      <ul>
        {blog.comments.length > 0 &&
          blog.comments.map((comment) => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  );
};

export default Blog;
