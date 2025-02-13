import { NextResponse } from 'next/server';
import { bookingMockData } from '../route';

// Lấy booking theo ID
export async function GET(_: Request, { params }: { params: { id: number } }) {
  const booking = bookingMockData.find((u) => u.id == params.id);
  if (!booking)
    return NextResponse.json({ error: 'booking not found' }, { status: 404 });
  return NextResponse.json(booking);
}

// Cập nhật booking theo ID
export async function PUT(
  req: Request,
  { params }: { params: { id: number } },
) {
  const index = bookingMockData.findIndex((u) => u.id === params.id);
  if (index === -1)
    return NextResponse.json({ error: 'booking not found' }, { status: 404 });

  const body = await req.json();
  bookingMockData[index] = { ...bookingMockData[index], ...body };
  return NextResponse.json(bookingMockData[index]);
}

// Xóa booking theo ID
export async function DELETE(
  _: Request,
  { params }: { params: { id: number } },
) {
  const index = bookingMockData.findIndex((u) => u.id == params.id);
  if (index === -1)
    return NextResponse.json({ error: 'booking not found' }, { status: 404 });

  const deletedbooking = bookingMockData.splice(index, 1);
  return NextResponse.json(deletedbooking[0]);
}
