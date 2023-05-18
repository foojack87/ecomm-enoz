import { NextResponse } from 'next/server';

export async function POST(request) {
  const formData = await request.formData();
  const files = formData.get('file');

  // Access the FormData here and perform further processing if needed

  if (files) {
    console.log(files.length);
    console.log(files);
  }

  return NextResponse.json({ message: 'Files received' });
}
