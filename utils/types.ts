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
