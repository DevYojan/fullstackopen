import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/reducers/userReducer';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async function () {
      users = await userService.getAll();
      dispatch(getAllUsers(users));
    })();
  }, []); //TODO: check later to put dispatch on dependency array

  let users = useSelector((state) => state.users);

  if (users === null) {
    return null;
  }

  return (
    <div className="users">
      <h3 className="header">Users</h3>
      <table className="ui very basic celled table">
        <thead>
          <tr>
            <th>author</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/user/${user.id}`} state={user}>
                  {user.name}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
