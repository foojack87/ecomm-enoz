'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    };

    // Update the current date and time every second
    const intervalId = setInterval(updateDateTime, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const today = new Date().setHours(0, 0, 0, 0);
        const response = await axios.get('/api/users');
        const filteredUsers = response.data.filter(
          (user) => new Date(user.createdAt).setHours(0, 0, 0, 0) === today
        );
        console.log(filteredUsers);
        setUsers(filteredUsers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  const fetchOrders = async () => {
    try {
      const today = new Date().setHours(0, 0, 0, 0);
      const response = await axios.get('/api/orders');
      const filteredOrders = response.data.filter(
        (order) => new Date(order.createdAt).setHours(0, 0, 0, 0) === today
      );
      console.log(filteredOrders);
      setOrders(filteredOrders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="h-[18rem] flex flex-col sm:h-[100%]">
        <div className="sm:mb-0 mb-12">{currentDateTime}</div>
        <div className="sm:flex justify-evenly items-center h-[100%]">
          <div className="flex flex-col text-center items-center sm:gap-4">
            <span className="text-xl">New Orders Today</span>
            <span className="bg-orange-400 rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl">
              {orders.length}
            </span>
          </div>
          <div className="flex flex-col text-center items-center sm:gap-4">
            <span className="text-xl">New Users Today</span>
            <span className="bg-orange-400 rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl">
              {users.length}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
