import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('123456', 10),
    role: 'admin',
  },
  {
    id: 2,
    username: 'operator',
    password: bcrypt.hashSync('123456', 10),
    role: 'operator',
  },
];

const SECRET_KEY = process.env.SECRET_KEY as string;

if (!SECRET_KEY) {
  throw new Error('SECRET_KEY is not set in .env.local');
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = users.find((u) => u.username === username);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY,
      { expiresIn: '365d' },
    );

    return NextResponse.json({ token });
  } catch {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
