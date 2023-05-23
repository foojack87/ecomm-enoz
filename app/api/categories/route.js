import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request) {
  await mongooseConnect();
  const body = await request.json();
  // const session = await getServerSession(request);

  const { categoryName, parentCategory, properties } = body;
  const categoryDoc = await Category.create({
    categoryName,
    parentCategory,
    properties,
  });

  return NextResponse.json(categoryDoc);
}

export async function GET(request) {
  await mongooseConnect();

  const res = await Category.find().populate('parentCategory');
  return NextResponse.json(res);
}

export async function PUT(request) {
  await mongooseConnect();
  const body = await request.json();

  const { categoryName, parentCategory, _id, properties } = body;
  const updatedCategory = await Category.updateOne(
    { _id },
    { categoryName, parentCategory, properties }
  );

  return NextResponse.json(updatedCategory);
}

export async function DELETE(request, { params }) {
  await mongooseConnect();

  const { id } = params;
  console.log('Received id for deletion:', id);

  const res = await Category.deleteOne({ _id: id });
  return NextResponse.json(res);
}
