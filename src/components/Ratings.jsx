import React from 'react';
import { Icon } from '@iconify/react';

export default function Ratings({ rating }) {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="ratings">
      {[...Array(totalStars)].map((_, index) => (
        <Icon
          key={index}
          icon={index < filledStars ? 'bi:star-fill' : 'bi:star'}
          className={index < filledStars ? 'filled' : 'empty'}
        />
      ))}
    </div>
  );
}
