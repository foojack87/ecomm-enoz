// export default function handler(req, res) {
//   res.json(req.method);
// }

import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await mongooseConnect();
  const body = await request.json();

  const { title, description, price } = body;
  const productDoc = await Product.create({
    title,
    description,
    price,
  });

  return NextResponse.json(productDoc);
}

export async function GET(request) {
  await mongooseConnect();
  const res = await Product.find();

  return NextResponse.json(res);
}
