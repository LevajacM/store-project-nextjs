"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

export function Review3DCard({
  name,
  rating,
  comment,
  image,
  children,
  classes,
  imageItemClasses,
}: {
  name: string;
  rating: React.ReactNode;
  comment: React.ReactNode;
  image: string;
  children?: React.ReactNode;
  classes?: string;
  imageItemClasses?: string;
}) {
  return (
    <CardContainer className='inter-var w-full'>
      <CardBody
        className={`relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-lg h-auto  border ${classes}`}
      >
        <header>
          <CardItem
            translateZ='50'
            className={`w-full flex  p-6 ${imageItemClasses}`}
          >
            <Image
              src={image}
              height={48}
              width={48}
              className={` w-12 h-12 object-cover rounded-full group-hover/card:shadow-xl `}
              alt={name}
            />
            <div className=' flex flex-col ml-4'>
              <CardItem
                translateZ='60'
                className='text-sm font-bold capitalize mb-1'
              >
                {name}
              </CardItem>
              <CardItem
                as='p'
                translateZ='60'
                className='text-neutral-500 dark:text-white text-md max-w-sm mt-2 
          sm:text-sm sm:max-w-xs relative
          '
              >
                {rating}{" "}
                <div className='absolute -top-10 -right-[350px]'>
                  {children}
                </div>
              </CardItem>
            </div>
          </CardItem>

          {/* </div> */}
        </header>
        <CardItem
          as='p'
          translateZ='70'
          className='text-neutral-500 dark:text-neutral-300 text-sm w-full  
          sm:text-xs px-4 pb-4'
        >
          {comment}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
