"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SignInButton } from "@clerk/nextjs";
import { BsTrash3Fill } from "react-icons/bs";
import { RiFileEditFill } from "react-icons/ri";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { deleteProductAction, editProductAction } from "@/utils/actions";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  text2?: string;
  size?: btnSize;
};

export const SubmitBtn = ({
  className = "",
  text = "submit",
  text2,
  size = "lg",
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <Button disabled variant='secondary' size={size} className={className}>
        <ReloadIcon className='mr-2 h-4 w-4  animate-spin' />
        {text2}
      </Button>
    );
  }

  return (
    <Button type='submit' variant='default' size={size} className={className}>
      {text}
    </Button>
  );
};

type actionType = "edit" | "delete";

export const IconBtn = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      variant='link'
      size='icon'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : actionType === "edit" ? (
        <RiFileEditFill />
      ) : (
        <BsTrash3Fill />
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button
        type='button'
        size='icon'
        variant='outline'
        className='p-2 cursor-pointer'
        asChild
      >
        <GoHeart />
      </Button>
    </SignInButton>
  );
};

export const CardSubmitButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className='p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className='animate-spin' />
      ) : isFavorite ? (
        <GoHeartFill />
      ) : (
        <GoHeart />
      )}
    </Button>
  );
};

export const ProductSignInButton = () => {
  return (
    <SignInButton mode='modal'>
      <Button type='button' className='mt-8'>
        Sign In
      </Button>
    </SignInButton>
  );
};
