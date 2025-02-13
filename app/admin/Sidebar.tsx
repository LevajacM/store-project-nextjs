"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { adminLinks } from "@/utils/links";

const AdminSidebar = () => {
  const pathName = usePathname();

  return (
    <aside>
      {adminLinks.map((link) => {
        const { href, label } = link;
        const isActivePage = pathName === href;

        return (
          <Button
            key={href}
            size='lg'
            asChild
            variant={isActivePage ? "default" : "ghost"}
            className='w-full mb-2 font-normal lg:!justify-start'
          >
            <Link href={href}>{label}</Link>
          </Button>
        );
      })}
    </aside>
  );
};

export default AdminSidebar;
