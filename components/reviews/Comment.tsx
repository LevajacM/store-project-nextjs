"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const Comment = ({ comment }: { comment: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const long = comment.length > 140;

  const displayComment =
    long && !isExpanded ? `${comment.slice(0, 140)}...` : comment;

  return (
    <div>
      <p className='text-sm'>{displayComment}</p>
      {long && (
        <Button
          variant='link'
          className='text-primary pl-0'
          onClick={toggleExpanded}
        >
          {isExpanded ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  );
};

export default Comment;
