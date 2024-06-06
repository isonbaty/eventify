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
  | 'internal Events'
  | 'external Events'
  | 'ms teams Events'
  | 'webinar'
  | 'online';

export const eventscategories: Category[] = [
  {
    label: 'internal Events',
    icon: MdEventAvailable,
  },
  {
    label: 'external Events',
    icon: MdEventAvailable,
  },
  {
    label: 'ms teams Events',
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
