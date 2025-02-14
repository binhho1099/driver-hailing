import { NextResponse } from 'next/server';
import { driverMockData } from '../driver/route';

export const bookingMockData = [
  {
    id: 1,
    customer_name: 'Nguyen Van A',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van A',
    driver_id: 1,
    status: 'pending',
  },
  {
    id: 2,
    customer_name: 'Tran Thi Mong Kieu',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    driver_id: 2,
    status: 'in_progress',
  },
  {
    id: 3,
    customer_name: 'Le Thi Hong',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van A',
    driver_id: 1,
    status: 'completed',
  },
  {
    id: 4,
    customer_name: 'Do Hoang Anh',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    driver_id: 2,
    status: 'canceled',
  },
  {
    id: 5,
    customer_name: 'Nguyen Van A',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van A',
    driver_id: 1,
    status: 'pending',
  },
  {
    id: 6,
    customer_name: 'Tran Thi Mong Kieu',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    driver_id: 2,
    status: 'in_progress',
  },
  {
    id: 7,
    customer_name: 'Le Thi Hong',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van A',
    driver_id: 1,
    status: 'completed',
  },
  {
    id: 8,
    customer_name: 'Do Hoang Anh',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    driver_id: 2,
    status: 'canceled',
  },
  {
    id: 9,
    customer_name: 'Nguyen Van A',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van A',
    driver_id: 1,
    status: 'pending',
  },
  {
    id: 10,
    customer_name: 'Tran Thi Mong Kieu',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    driver_id: 2,
    status: 'in_progress',
  },
  {
    id: 11,
    customer_name: 'Le Thi Hong',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van A',
    driver_id: 1,
    status: 'completed',
  },
  {
    id: 12,
    customer_name: 'Do Hoang Anh',
    pickup: 'Ho Chi Minh',
    drop_off: 'Ha Noi',
    driver_name: 'Nguyen Van B',
    driver_id: 2,
    status: 'canceled',
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const searchQuery = searchParams.get('search')?.toLowerCase();
  const statusFilter = searchParams.get('status');
  const driverIdFilter = searchParams.get('driver_id');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  let filteredData = bookingMockData;

  if (searchQuery) {
    filteredData = filteredData.filter(
      (booking) =>
        booking.customer_name.toLowerCase().includes(searchQuery) ||
        booking.driver_name.toLowerCase().includes(searchQuery) ||
        booking.id.toString().includes(searchQuery),
    );
  }

  if (statusFilter) {
    filteredData = filteredData.filter(
      (booking) => booking.status === statusFilter,
    );
  }

  if (driverIdFilter) {
    filteredData = filteredData.filter(
      (booking) => booking.driver_id === Number(driverIdFilter),
    );
  }

  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return NextResponse.json({
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data: paginatedData,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  const driver_name = driverMockData.find(
    (driver) => driver.id == body.driver_id,
  )?.full_name;

  const newBooking = {
    id: String(Math.floor(Math.random() * 100000)),
    ...body,
    status: 'pending',
    driver_name,
  };
  bookingMockData.push(newBooking);
  return NextResponse.json(newBooking, { status: 201 });
}
