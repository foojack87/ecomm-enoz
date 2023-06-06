'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <>
      <table className="basic">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 &&
            users.map((user, index) => (
              <tr key={index} className="text-center">
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
