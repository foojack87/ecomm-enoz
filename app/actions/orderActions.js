import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { isAdminRequest } from '../api/auth/[...nextauth]/route';

mongooseConnect();
isAdminRequest();

export async function getAllOrders() {
  const orderData = await Order.find().sort({ createdAt: -1 });

  const orders = orderData.map((order) => ({
    ...order._doc,
    _id: order._doc._id.toString(),
  }));

  console.log(orders);

  return { orderData: orders };
}
