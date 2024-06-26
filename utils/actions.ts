'use server';

import {
  profileSchema,
  validateWithZodSchema,
  imageSchema,
  propertySchema,
  eventSchema,
  createReviewSchema,
} from './schema';
import db from './db';
import { clerkClient, currentUser } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { uploadImage } from './supabase';
import { calculateTotals } from './calculateTotals';
import { date, object } from 'zod';
import { formatDate } from './format';

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error('You must be logged in to perform this action.');
  if (!user.privateMetadata.hasProfile) redirect('/profile/create');
  return user;
};

const getNewAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect('/');
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : 'An error occurred',
  };
};

export const getAdminUser = async () => {
  const user = await currentUser();

  if (!user) return null;
  if (!user.publicMetadata.isAdmin) return null;
  return user;
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error('Please login to create a profile');

    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);
    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? '',
        ...validatedFields,
      },
    });

    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
        isAdmin: false,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const fetchProfileImage = async () => {
  const user = await currentUser();

  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
      firstName: true,
    },
  });
  return profile?.profileImage;
};
export const fetchFirsName = async () => {
  const user = await currentUser();

  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      firstName: true,
    },
  });
  return profile?.firstName;
};

export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect('/profile/create');
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });
    revalidatePath('/profile');
    return { message: 'Profile updated successfully' };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  }
};

export const updateProfileImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });

    const fullPath = await uploadImage(validatedFields.image);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: fullPath,
      },
    });
    revalidatePath('/profile');
    return { message: 'Profile image updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const createPropertyAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(propertySchema, rawData);
    return { message: 'Property created successfully' };
  } catch (error) {
    return renderError(error);
  }
  // redirect('/');
};

export const createEventAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const file = formData.get('image') as File;
    console.log(rawData);

    const validatedFields = validateWithZodSchema(eventSchema, rawData);
    const validateFile = validateWithZodSchema(imageSchema, { image: file });
    const fullPath = await uploadImage(validateFile.image);
    const dateFrom = new Date(rawData.dateFrom.toString());

    await db.event.create({
      data: {
        profileId: user.id,
        image: fullPath,
        dateFrom,

        ...validatedFields,
      },
    });
  } catch (error) {
    return renderError(error);
  }
  redirect('/');
};

export const fetchEvents = async ({
  search = '',
  category,
}: {
  search?: string;
  category?: string;
}) => {
  // const events = await db.event.findMany({});
  const events = await db.event.findMany({
    where: {
      category,
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { tagline: { contains: search, mode: 'insensitive' } },
        { venue: { contains: search, mode: 'insensitive' } },
      ],
    },

    select: {
      id: true,
      name: true,
      tagline: true,
      venue: true,
      image: true,
      country: true,
      price: true,
    },
    orderBy: {
      createdat: 'desc',
    },
  });
  return events;
};

export const fetchFavoriteId = async ({ eventId }: { eventId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: {
      eventId,
      profileId: user.id,
    },
    select: {
      id: true,
    },
  });
  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  eventId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { eventId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: {
          eventId,
          profileId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: favoriteId ? 'Removed from Favorites' : 'Added to Favorites',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      event: {
        select: {
          id: true,
          name: true,
          tagline: true,
          venue: true,
          image: true,
          country: true,
          price: true,
        },
      },
    },
  });
  return favorites.map((favorite) => favorite.event);
};

export const fetchEventDetails = async (id: string) => {
  return db.event.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
      bookings: {
        select: {
          checkIn: true,
          checkOut: true,
        },
      },
      register: {
        select: {
          raffleNumber: true,
          isRaffle: true,
          eventId: true,
          profileId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
};

export const RegisterUnRegistertoEvent = async (prevState: {
  eventId: string;
  attendeeId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { eventId, attendeeId, pathname } = prevState;

  try {
    if (attendeeId) {
      await db.eventAttendee.delete({
        where: {
          id: attendeeId,
        },
      });
    } else {
      await db.eventAttendee.create({
        data: {
          eventId,
          attendeeId: user.id,
        },
      });
    }
    revalidatePath(pathname);
    return {
      message: attendeeId
        ? 'You have unregistered from this event'
        : 'You have registered to this event',
    };
  } catch (error) {
    return renderError(error);
  }
};

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(createReviewSchema, rawData);
    await db.review.create({
      data: {
        ...validatedFields,
        profileId: user.id,
      },
    });
    revalidatePath(`/events/${validatedFields.eventId}`);
    return { message: 'Review submitted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchEventReviews = async (eventId: string) => {
  const reviews = await db.review.findMany({
    where: {
      eventId,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return reviews;
};

export const fetchEventReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      rating: true,
      comment: true,
      event: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        profileId: user.id,
      },
    });
    revalidatePath('/reviews');
    return { message: 'Review deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export async function fetchEventRating(eventId: string) {
  const result = await db.review.groupBy({
    by: ['eventId'],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      eventId,
    },
  });
  return {
    rating: result[0]?._avg.rating?.toFixed() ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
}

export const findExistingReview = async (userId: string, eventId: string) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      eventId,
    },
  });
};

export const createBookingAction = async (prevState: {
  eventId: string;
  checkIn: Date;
  checkOut: Date;
}) => {
  const user = await getAuthUser();
  const { eventId, checkIn, checkOut } = prevState;
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      price: true,
    },
  });
  if (!event) {
    return { message: 'Event not found' };
  }
  const { orderTotal, totalDays } = calculateTotals({
    checkIn,
    checkOut,
    price: event.price,
  });
  try {
    const booking = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        totalDays,
        orderTotal,
        profileId: user.id,
        eventId,
      },
    });
  } catch (error) {
    renderError(error);
  }
  redirect('/bookings');
};

export const registerEventAction = async (prevState: {
  eventId: string;
  raffleNumber: number;
}) => {
  const user = await getAuthUser();
  const isRegistered = await db.register.findFirst({
    where: {
      profileId: user.id,
      eventId: prevState.eventId,
    },
  });
  const { eventId } = prevState;
  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      price: true,
      register: {
        select: {
          raffleNumber: true,
          isRaffle: true,
          id: true,
          eventId: true,
          orderTotal: true,
          profileId: true,
        },
      },
    },
  });
  if (!event) {
    return { message: 'Event not found' };
  }
  if (isRegistered) {
    return { message: 'You have already registered for this event' };
  }

  const randomNumber = Math.floor(Math.random() * 100000);
  try {
    const register = await db.register.create({
      data: {
        raffleNumber: randomNumber,
        isRaffle: true,
        orderTotal: event.price,
        eventId,
        profileId: user.id,
      },
    });
  } catch (error) {
    renderError(error);
  }

  redirect('/bookings');
};

export const findExistingRegister = async (userId: string, eventId: string) => {
  return db.register.findFirst({
    where: {
      profileId: userId,
      eventId,
    },
    select: {
      id: true,
      raffleNumber: true,
      createdAt: true,
    },
  });
};

export const fetchRegisteredEvents = async () => {
  const user = await getAuthUser();
  const registeredEvents = await db.register.findMany({
    where: {
      profileId: user.id,
    },
    include: {
      event: {
        select: {
          id: true,
          name: true,
          tagline: true,
          venue: true,
          country: true,
          price: true,
          dateFrom: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return registeredEvents;
};

export async function deleteRegisterAction(prevState: { registerId: string }) {
  const { registerId } = prevState;
  const user = await getAuthUser();
  try {
    const result = await db.register.delete({
      where: {
        id: registerId,
        profileId: user.id,
      },
    });

    revalidatePath('/bookings');
    return { message: 'Registration to this event deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
}

export async function isRegisterforEvent(eventId: string, userId: string) {
  const register = await db.register.findFirst({
    where: {
      eventId: eventId,
      profileId: userId,
    },
    select: {
      id: true,
      raffleNumber: true,
      createdAt: true,
    },
  });
  return register;
}

export const fetchEventsByUser = async () => {
  const user = await getAuthUser();
  const events = await db.event.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const eventsWithSubscribers = await Promise.all(
    events.map(async (event) => {
      const totalSubscribers = await db.register.aggregate({
        where: {
          eventId: event.id,
        },
        _count: {
          eventId: true,
        },
      });
      const orderTotalSum = await db.register.aggregate({
        where: {
          eventId: event.id,
          paymentStatus: false,
        },
        _sum: {
          orderTotal: true,
        },
      });
      return {
        ...event,
        totalSubscribers: totalSubscribers._count.eventId,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      };
    })
  );
  return eventsWithSubscribers;
};

export const deleteEventAction = async (prevState: { eventId: string }) => {
  const { eventId } = prevState;
  const user = await getAuthUser();

  try {
    await db.event.delete({
      where: {
        id: eventId,
        profileId: user.id,
      },
    });
    revalidatePath('/myevents');
    return { message: 'Event deleted successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchEventDetailsByUser = async (eventId: string) => {
  const user = await getAuthUser();
  return db.event.findUnique({
    where: {
      id: eventId,
      profileId: user.id,
    },
  });
};

export const updateEventAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const eventId = formData.get('id') as string;
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(eventSchema, rawData);
    const dateFrom = new Date(rawData.dateFrom.toString());
    await db.event.update({
      where: {
        id: eventId,
        profileId: user.id,
      },
      data: {
        dateFrom,
        ...validatedFields,
      },
    });
    revalidatePath(`/eventspost/${eventId}/edit`);
    return { message: 'Event updated successfully' };
  } catch (error) {
    return renderError(error);
  }
};

export const updateEventImageAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  const eventId = formData.get('id') as string;
  try {
    const image = formData.get('image') as File;
    const validatedFields = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFields.image);
    await db.event.update({
      where: {
        id: eventId,
        profileId: user.id,
      },
      data: {
        image: fullPath,
      },
    });
    revalidatePath(`/eventspost/${eventId}/edit`);
    return { message: 'Event image updated successfully' };
  } catch (error) {
    renderError(error);
    return { message: 'An error occurred while uploading the Image ' };
  }
};

export const fetchRegisrationDetails = async (eventId: string) => {
  const user = await getAuthUser();
  return db.register.findUnique({
    where: {
      id: eventId,
      profileId: user.id,
    },
    select: {
      raffleNumber: true,
      isRaffle: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const fetchRervations = async () => {
  const user = await getAuthUser();
  const reservations = await db.booking.findMany({
    where: {
      event: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      event: {
        select: {
          id: true,
          name: true,
          tagline: true,
          venue: true,
          country: true,
          price: true,
          dateFrom: true,
        },
      },
    },
  });
  return reservations;
};

export const fetchStats = async () => {
  await getNewAdminUser();
  const usersCount = await db.profile.count();
  const eventsCount = await db.event.count();
  const bookingsCount = await db.booking.count();
  const reviewsCount = await db.review.count();
  const favoritesCount = await db.favorite.count();
  const registerCount = await db.register.count();

  return {
    usersCount,
    eventsCount,
    bookingsCount,
    reviewsCount,
    favoritesCount,
    registerCount,
  };
};

export const fetchChartsData = async () => {
  await getNewAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const registrations = await db.register.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const registrationsPerMonth = registrations.reduce((total, current) => {
    const date = formatDate(current.createdAt, true);
    const existingEntry = total.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }
    return total;
  }, [] as Array<{ date: string; count: number }>);
  return registrationsPerMonth;
};

export const fetchProfilePerEvent = async (eventId: string) => {
  const user = await getAuthUser();
  const profileInfoPerEvent = await db.event.findMany({
    where: {
      id: eventId,
    },
    include: {
      register: {
        select: {
          profileId: true,
          raffleNumber: true,
        },
      },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          profileImage: true,
          email: true,
        },
      },
    },
  });
  return profileInfoPerEvent;
};

export const fetchEventRegistrations = async (eventId: string) => {
  const user = await getAuthUser();
  return db.register.findMany({
    where: {
      eventId,
    },
    include: {
      event: {
        select: {
          name: true,
          id: true,
        },
      },
      profile: {
        select: {
          firstName: true,
          lastName: true,
          email: true,
          profileImage: true,
        },
      },
    },
  });
};
