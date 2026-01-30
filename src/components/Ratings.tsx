import React, { memo, ReactNode } from "react";
import { Icon } from "@iconify/react";

interface RatingsProps {
  rating: number;
}

const Ratings = memo(function Ratings({ rating }: RatingsProps): ReactNode {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="ratings">
      {[...Array(totalStars)].map((_, index) => (
        <Icon
          key={index}
          icon={index < filledStars ? "bi:star-fill" : "bi:star"}
          className={index < filledStars ? "filled" : "empty"}
        />
      ))}
    </div>
  );
});

Ratings.displayName = "Ratings";
export default Ratings;
