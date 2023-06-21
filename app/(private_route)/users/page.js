'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/users').then((res) => {
      setUsers(res.data);
      setLoading(false);
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
          {loading ? (
            <tr>
              <td colSpan="2">
                <Loading />
              </td>
            </tr>
          ) : (
            <>
              {users?.length > 0 &&
                users.map((user, index) => (
                  <tr key={index} className="text-center">
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Users;
