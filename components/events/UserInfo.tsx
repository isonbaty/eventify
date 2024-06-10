import Image from 'next/image';

type UserInfoProps = {
  profile: {
    profileImage: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};
function UserInfo({
  profile: { profileImage, firstName, lastName, email },
}: UserInfoProps) {
  return (
    <article className='grid grid-cols-[auto,1fr] gap-4 mt-4'>
      <Image
        src={profileImage}
        alt={firstName}
        width={50}
        height={50}
        className='rounded w-12 h-12 object-cover'
      />
      <div>
        <p>
          Hosted by{' '}
          <span className='font-bold'>
            {' '}
            {firstName} {lastName}
          </span>
        </p>
        <p className='text-muted-foreground font-light'>{email}</p>
      </div>
    </article>
  );
}
export default UserInfo;
