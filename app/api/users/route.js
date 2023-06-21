import { mongooseConnect } from '@/lib/mongoose';
import { User } from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  await mongooseConnect();

  try {
    const users = await User.find({}, 'name email createdAt').sort({
      createdAt: -1,
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error(error);
  }
}
