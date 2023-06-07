import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';
import { isAdminRequest } from '../auth/[...nextauth]/route';

export async function GET(request) {
  await mongooseConnect();
  await isAdminRequest();

  try {
    const users = await User.find({}, 'name email createdAt').sort({
      createdAt: -1,
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error(error);
  }
}
