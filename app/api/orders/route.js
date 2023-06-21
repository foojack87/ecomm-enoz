import { mongooseConnect } from '@/lib/mongoose';
import { Order } from '@/models/Order';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await mongooseConnect();

  const res = await Order.find().sort({ createdAt: -1 });
  return NextResponse.json(res);
}
