type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/favorites', label: 'favorites' },
  { href: '/bookings', label: 'My Registrations' },
  { href: '/profile ', label: 'profile' },
  { href: '/reviews ', label: 'reviews' },
  { href: '/eventspost', label: 'My Events & Subscriptions' },
  { href: '/admin', label: 'admin' },
  { href: '/eventspost/create', label: 'Create New Event' },
  // { href: '/gallery ', label: 'gallery' },
];
