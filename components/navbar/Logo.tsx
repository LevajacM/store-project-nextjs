import Link from "next/link";
import { Button } from "../ui/button";

const Logo = () => {
  return (
    <Button
      asChild
      size='default'
      className='px-0 bg-transparent hover:bg-transparent  shadow-none'
    >
      <Link href='/'>
        <img src='/home.png' alt='Logo' className='h-12' />
      </Link>
    </Button>
  );
};

export default Logo;
