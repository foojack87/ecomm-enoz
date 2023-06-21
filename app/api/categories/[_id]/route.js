import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  await mongooseConnect();

  const id = params;
  console.log('Received id for deletion:', id);

  const res = await Category.deleteOne({ _id: id });
  return NextResponse.json(res);
}
