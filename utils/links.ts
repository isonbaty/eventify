type NavLink = {
  href: string;
  label: string;
};

export const links: NavLink[] = [
  { href: '/', label: 'home' },
  { href: '/favorites ', label: 'favorites' },
  { href: '/bookings ', label: 'My Events' },
  { href: '/reviews ', label: 'reviews' },
  // { href: '/events', label: 'My Events' },
  { href: '/profile ', label: 'profile' },
  // { href: '/gallery ', label: 'gallery' },
];
