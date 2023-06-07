'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      console.log(response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOrder = (order) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this ${order}?`,
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log('Deleting order with id:', order);
        await axios.delete(`/api/orders/${order}`);
        fetchOrders();
      }
    });
  };

  return (
    <>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                  {order.paid ? 'YES' : 'NO'}
                </td>
                <td>
                  {order.name} {order.email} <br /> {order.city}
                  {order.postalCode} {order.country}
                  <br /> {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((line, index) => (
                    <div key={index}>
                      {line.price_data.product_data.name} x {line.quantity}{' '}
                      <br />
                    </div>
                  ))}
                </td>
                <td>
                  <button
                    className="text-red-500"
                    onClick={() => deleteOrder(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
