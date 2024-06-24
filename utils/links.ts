type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/favorites ', label: 'favorites' },
  { href: '/bookings ', label: 'My Registrations' },
  // { href: '/eventspost ', label: 'Events Subscription' },
  { href: '/reviews ', label: 'reviews' },
  { href: '/admin', label: 'admin' },
  { href: '/profile ', label: 'profile' },
  // { href: '/gallery ', label: 'gallery' },
];
