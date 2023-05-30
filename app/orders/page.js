'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders').then((res) => {
      setOrders(res.data);
    });
  }, []);

  return (
    <>
      <h1>Orders</h1>
      <table className="basic">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders?.length > 0 &&
            orders.map((order, index) => (
              <tr key={index}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
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
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
