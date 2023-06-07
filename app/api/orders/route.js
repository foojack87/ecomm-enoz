import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { NextResponse } from 'next/server';
import { isAdminRequest } from '../auth/[...nextauth]/route';

export async function GET(request) {
  await mongooseConnect();
  await isAdminRequest();

  const res = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(res);
}

export async function DELETE(request, context) {
  await mongooseConnect();
  await isAdminRequest();

  const {
    params: {
      newOrder: [, id],
    },
  } = context;

  console.log(id);

  if (id) {
    const res = await Order.deleteOne({ _id: id });
    return NextResponse.json(res);
  }
}
