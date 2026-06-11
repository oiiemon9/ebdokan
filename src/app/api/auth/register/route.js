import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connect } from '@/app/lib/dbConnect';

export async function POST(req) {
  try {
    const { name, identifier, password } = await req.json();
    if (!name || !identifier || !password) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 },
      );
    }

    // phone না email?
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    const isPhone = /^(\+880|880|0)?1[3-9]\d{8}$/.test(identifier);

    if (!isEmail && !isPhone) {
      return NextResponse.json(
        { message: 'Enter a valid email or Bangladeshi phone number' },
        { status: 400 },
      );
    }

    const usersCollection = await connect('users');
    // already exists?
    const existing = await usersCollection.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    });

    if (existing) {
      if (isEmail && existing.email === identifier) {
        if (existing.provider !== 'register') {
          return NextResponse.json(
            {
              message: `This email is already registered. Please login with ${existing.provider}.`,
            },
            { status: 409 },
          );
        }

        return NextResponse.json(
          {
            message: 'This email is already registered. Please login.',
          },
          { status: 409 },
        );
      }
      if (isPhone && existing.phone === identifier) {
        if (existing.authType !== 'phone') {
          return NextResponse.json(
            {
              message: `This phone number is already registered. Please login.`,
            },
            { status: 409 },
          );
        }

        return NextResponse.json(
          { message: 'An account with this email/phone already exists' },
          { status: 409 },
        );
      }
    }

    // password hash
    const hashedPassword = await bcrypt.hash(password, 12);

    await usersCollection.insertOne({
      name,
      email: isEmail ? identifier : '',
      phone: isPhone ? identifier : '',
      password: hashedPassword,
      provider: 'register',
      authType: isEmail ? 'email' : 'number',
      image: null,
      address: '',
      role: 'user',
      balance: 0,
      emailVerified: false,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Account created successfully' },
      { status: 201 },
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
