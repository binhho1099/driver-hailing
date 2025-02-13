import { NextResponse } from 'next/server';

export const driverMockData = [
  {
    id: '1',
    full_name: 'Nguyen Van A',
    phone: '0987654321',
    email: 'nguyenvana@gmail.com',
    gender: 'male',
    address: 'Thu Duc, Ho Chi Minh',
    rating: '4',
    vehicle: {
      brand: 'Honda',
      modal: 'AirBlade',
      license_plate: '51-A1 12345',
      color: 'gray',
    },
  },
  {
    id: '2',
    full_name: 'Nguyen Van B',
    phone: '0123456789',
    email: 'nguyenvanb@gmail.com',
    gender: 'male',
    address: 'Binh Thanh, Ho Chi Minh',
    rating: '5',
    vehicle: {
      brand: 'Honda',
      modal: 'Winner',
      license_plate: '51-A1 56789',
      color: 'red',
    },
  },
];

export async function GET() {
  return NextResponse.json(driverMockData);
}
