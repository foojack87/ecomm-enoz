import { mongooseConnect } from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import { Admin } from '@/models/Admin';

export async function POST(request) {
  await mongooseConnect();

  const body = await request.json();

  const { email, name, password } = body;

  const oldAdmin = await Admin.findOne({ email });
  if (oldAdmin) {
    return NextResponse.json(
      { error: 'Email is already in use!' },
      { status: 422 }
    );
  }

  const admin = new Admin({ email, name, password, role: 'user' });
  await admin.save();

  return NextResponse.json({
    admin: {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  });
}
