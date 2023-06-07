import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { isAdminRequest } from '../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
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

export async function deleteOrder(orderId) {
  try {
    const order = await Order.findByIdAndDelete(orderId, { new: true });
    revalidatePath('/');
    return { ...order._doc, _id: order._id.toString() };
  } catch (error) {
    throw new Error(error.message || 'failed to delete order!');
  }
}
