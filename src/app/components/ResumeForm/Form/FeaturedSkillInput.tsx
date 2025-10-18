import React, { useState } from "react";
import { INPUT_CLASS_NAME } from "components/ResumeForm/Form/InputGroup";

export const FeaturedSkillInput = ({
  skill,
  rating,
  setSkillRating,
  placeholder,
  className,
  circleColor,
}: {
  skill: string;
  rating: number;
  setSkillRating: (skill: string, rating: number) => void;
  placeholder: string;
  className?: string;
  circleColor?: string;
}) => {
  return (
    <div className={`flex ${className}`}>
      <input
        type="text"
        value={skill}
        placeholder={placeholder}
        onChange={(e) => setSkillRating(e.target.value, rating)}
        className={INPUT_CLASS_NAME}
      />
      <CircleRating
        rating={rating}
        setRating={(newRating) => setSkillRating(skill, newRating)}
        circleColor={circleColor}
      />
    </div>
  );
};

const CircleRating = ({
  rating,
  setRating,
  circleColor = "#38bdf8",
}: {
  rating: number;
  setRating: (rating: number) => void;
  circleColor?: string;
}) => {
  const numCircles = 5;
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1 p-2">
      {[...Array(numCircles)].map((_, idx) => {
        const isActive = (hoverRating !== null && hoverRating >= idx) || (hoverRating === null && rating >= idx);
        return (
          <div
            className={`cursor-pointer transition-transform duration-200 hover:scale-110`}
            key={idx}
            onClick={() => setRating(idx)}
            onMouseEnter={() => setHoverRating(idx)}
            onMouseLeave={() => setHoverRating(null)}
          >
            <div
              className="h-6 w-6 rounded-full border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              style={{
                backgroundColor: isActive ? circleColor : "#ffffff",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
