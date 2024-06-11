'use client';
import { useState } from 'react';
import { Button } from '../ui/button';

function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const longComment = comment.length > 130;
  const displayComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;
  return (
    <div>
      <p className='text-sm'>{displayComment}</p>
      {longComment && (
        <Button
          variant='link'
          onClick={toggleExpand}
          className='text-muted-foreground pl-0'
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </Button>
      )}
    </div>
  );
}
export default Comment;
