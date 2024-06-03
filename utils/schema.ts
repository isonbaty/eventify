import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
  // firstName: z
  //   .string()
  //   .min(2, { message: 'First Name must be at least 2 characters long' }),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  username: z.string().min(2),
});
