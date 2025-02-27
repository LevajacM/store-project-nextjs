import { TbUserFilled } from "react-icons/tb";
import { currentUser } from "@clerk/nextjs/server";

const UserIcon = async () => {
  const user = await currentUser();

  const profileImage = user?.imageUrl;

  if (profileImage) {
    return (
      <img
        src={profileImage}
        className='w-6 h-6 rounded-full object-cover'
        alt='user-icon'
      />
    );
  }

  return (
    <TbUserFilled className='w-6 h-6 bg-primary rounded-full text-white' />
  );
};

export default UserIcon;
