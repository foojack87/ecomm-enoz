import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { NextResponse } from 'next/server';
import { isAdminRequest } from '../../auth/[...nextauth]/route';

export async function DELETE(request, { params }) {
  await mongooseConnect();
  await isAdminRequest();

  const id = params;
  console.log('Received id for deletion:', id);

  const res = await Order.deleteOne({ _id: id });
  return NextResponse.json(res);
}
