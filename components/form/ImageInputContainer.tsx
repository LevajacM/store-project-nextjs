"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitBtn } from "./Buttons";
import { type actionFunction } from "@/utils/types";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

const ImageInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, action, text } = props;
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className='mb-8'>
      <Image
        src={image}
        width={200}
        height={200}
        className='rounded-md object-cover mb-4 w-[200px] h-[200px]'
        alt={name}
        priority
      />
      <Button
        variant='outline'
        size='sm'
        onClick={() => setIsFormVisible((prev) => !prev)}
      >
        {text}
      </Button>
      {isFormVisible && (
        <div className='max-w-md mt-4'>
          <FormContainer action={action}>
            {props.children}
            <ImageInput />
            <SubmitBtn size='sm' text={text} text2='Updating image...' />
          </FormContainer>
        </div>
      )}
    </div>
  );
};

export default ImageInputContainer;
