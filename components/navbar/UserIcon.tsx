import { LuUser2 } from 'react-icons/lu';
import { fetchProfileImage, fetchFirsName } from '@/utils/actions';

async function UserIcon() {
  const profileImage = await fetchProfileImage();
  const firstName = await fetchFirsName();
  if (profileImage) {
    return (
      <>
        <img
          src={profileImage}
          className='w-6 h-6 bg-primary rounded-full object-cover'
        />
        <span>{firstName}</span>
      </>
    );
  }
  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;
