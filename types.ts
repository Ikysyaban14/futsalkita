export interface Court {
  id: string;
  name: string;
  type: 'Sintetis' | 'Vinyl';
  location: string;
  locationDetail: string;
  pricePerHour: number;
  rating: number;
  image: string;
}

export interface Booking {
  id: string;
  courtId: string;
  courtName: string;
  courtType: 'Sintetis' | 'Vinyl';
  venueName: string;
  userName: string;
  email: string;
  date: string; // YYYY-MM-DD
  time: string; // "19:00"
  duration: number; // e.g. 2 hours
  courtPrice: number;
  uniqueCode: number;
  totalPrice: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  proofUrl?: string;
  proofName?: string;
  createdAt: string;
}

export interface VerificationQueueItem {
  id: string;
  userName: string;
  email: string;
  courtName: string;
  schedule: string;
  proofUrl: string;
  bookingDetails: Booking;
}

export type ActiveView = 'home' | 'schedule' | 'payment' | 'admin' | 'my-bookings';
