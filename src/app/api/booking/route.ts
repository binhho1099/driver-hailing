import { NextResponse } from 'next/server';

export const bookingMockData = [
  {
    id: 1,
    customer_name: 'Nguyen Van A',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Ho Tan Binh',
    status: 'pending',
  },
  {
    id: 2,
    customer_name: 'Tran Thi Mong Kieu',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    status: 'in_progress',
  },
  {
    id: 3,
    customer_name: 'Le Thi Hong',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'La Xuan Sac',
    status: 'completed',
  },
  {
    id: 4,
    customer_name: 'Do Hoang Anh',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Truong Thi Thuy',
    status: 'canceled',
  },
];

export async function GET() {
  return NextResponse.json(bookingMockData);
}

export async function POST(req: Request) {
  const body = await req.json();
  const newBooking = {
    id: String(bookingMockData.length + 1),
    ...body,
    status: 'pending',
  };
  bookingMockData.push(newBooking);
  return NextResponse.json(newBooking, { status: 201 });
}
