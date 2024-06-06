export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

export type EventCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
  venue: string;
  createdAt: string;
};
