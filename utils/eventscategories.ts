import { IconType } from 'react-icons';

import { PiMicrosoftTeamsLogo } from 'react-icons/pi';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { MdEventAvailable } from 'react-icons/md';
import { RiPresentationLine } from 'react-icons/ri';
import { PiChatDots } from 'react-icons/pi';

type Category = {
  label: CategoryLabel;
  icon: IconType;
};

export type CategoryLabel =
  | 'internal'
  | 'external'
  | 'ms teams'
  | 'webinar'
  | 'online';

export const eventscategories: Category[] = [
  {
    label: 'internal',
    icon: MdEventAvailable,
  },
  {
    label: 'external',
    icon: MdEventAvailable,
  },
  {
    label: 'ms teams',
    icon: PiMicrosoftTeamsLogo,
  },
  {
    label: 'webinar',
    icon: RiPresentationLine,
  },
  {
    label: 'online',
    icon: HiOutlineStatusOnline,
  },
];
