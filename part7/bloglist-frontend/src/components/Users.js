import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/reducers/userReducer';
import userService from '../services/users';

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
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>author</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;