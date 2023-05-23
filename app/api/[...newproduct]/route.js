// export default function handler(req, res) {
//   res.json(req.method);
// }

import { mongooseConnect } from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await mongooseConnect();
  const body = await request.json();

  const { title, description, price, images, category, productProperties } =
    body;
  const productDoc = await Product.create({
    title,
    description,
    price,
    images,
    category,
    productProperties,
  });

  return NextResponse.json(productDoc);
}

export async function GET(request, context) {
  await mongooseConnect();

  const {
    params: {
      newproduct: [, id],
    },
  } = context;

  console.log(id);

  if (id) {
    const res = await Product.findOne({ _id: id });
    return NextResponse.json(res);
  } else {
    const res = await Product.find();
    return NextResponse.json(res);
  }
}

export async function PUT(request) {
  await mongooseConnect();
  const body = await request.json();

  const {
    title,
    description,
    price,
    _id,
    images,
    category,
    productProperties,
  } = body;
  const updatedProduct = await Product.updateOne(
    { _id },
    { title, description, price, images, category, productProperties }
  );

  return NextResponse.json(updatedProduct);
}

export async function DELETE(request, context) {
  await mongooseConnect();

  const {
    params: {
      newproduct: [, id],
    },
  } = context;

  console.log(id);

  if (id) {
    const res = await Product.deleteOne({ _id: id });
    return NextResponse.json(res);
  }
}
