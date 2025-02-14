import { NextResponse } from 'next/server';
import { bookingMockData } from '../route';
import { driverMockData } from '../../driver/route';

export async function GET(_: Request, { params }: { params: { id: number } }) {
  const booking = bookingMockData.find((u) => u.id == params.id);
  if (!booking)
    return NextResponse.json({ error: 'booking not found' }, { status: 404 });
  return NextResponse.json(booking);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: number } },
) {
  const index = bookingMockData.findIndex((u) => u.id == params.id);
  if (index === -1)
    return NextResponse.json({ error: 'booking not found' }, { status: 404 });

  const body = await req.json();

  const driver_name = driverMockData.find(
    (driver) => driver.id == body.driver_id,
  )?.full_name;

  bookingMockData[index] = { ...bookingMockData[index], ...body, driver_name };
  return NextResponse.json(bookingMockData[index]);
}

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
