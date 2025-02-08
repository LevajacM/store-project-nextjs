import Image from "next/image";
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
        <Image src='/home.png' alt='Logo' height={48} width={48} priority />
      </Link>
    </Button>
  );
};

export default Logo;
