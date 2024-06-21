export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type EventCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  venue: string;
  country: string;
  price: number | null;
};

export type DateRangeSelect = {
  startDate: Date;
  endDate: Date;
  key: string;
};

export type Booking = {
  checkIn: Date;
  checkOut: Date;
};

export type Register = {
  profileId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
  isRaffle: boolean;
  raffleNumber: number;
};
