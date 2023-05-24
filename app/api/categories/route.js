import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { isAdminRequest } from '../auth/[...nextauth]/route';

export async function POST(request) {
  await mongooseConnect();
  await isAdminRequest();
  const body = await request.json();

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
  await isAdminRequest();

  const res = await Category.find().populate('parentCategory');
  return NextResponse.json(res);
}

export async function PUT(request) {
  await mongooseConnect();
  await isAdminRequest();
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
  await isAdminRequest();

  const session = await getServerSession(authOptions);
  console.log(session);

  const { id } = params;
  console.log('Received id for deletion:', id);

  const res = await Category.deleteOne({ _id: id });
  return NextResponse.json(res);
}
