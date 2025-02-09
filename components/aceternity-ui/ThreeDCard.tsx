"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";

export function ThreeDCard({
  name,
  company,
  price,
  image,
  classes,
  imageClasses,
  imageItemClasses,
  prior,
}: {
  name?: string;
  company?: string;
  price?: number | null;
  image: string;
  classes: string;
  imageClasses: string;
  imageItemClasses?: string;
  prior?: boolean;
}) {
  return (
    <CardContainer className='inter-var'>
      <CardBody
        className={`relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  border ${classes}`}
      >
        <CardItem translateZ='50' className='text-xl font-bold text-orange-600'>
          {name}
        </CardItem>
        <CardItem
          as='p'
          translateZ='60'
          className='text-neutral-500 dark:text-white text-md max-w-sm mt-2 
          sm:text-sm sm:max-w-xs
          '
        >
          {company}
        </CardItem>
        <CardItem
          as='p'
          translateZ='70'
          className='text-neutral-500 dark:text-neutral-300 text-sm max-w-sm mt-2 
          sm:text-xs
          '
        >
          {price ? `$${price}` : null}
        </CardItem>

        <CardItem translateZ='100' className={`w-full ${imageItemClasses}`}>
          <Image
            src={image}
            height='1000'
            width='1000'
            className={`${imageClasses} w-full object-cover rounded-xl group-hover/card:shadow-xl `}
            alt={name ? name : "hero image"}
            priority={prior ? prior : false}
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
