// src/components/StarRating.js

import React from 'react';
import styled from 'styled-components';

const Stars = styled.div`
  display: flex;
`;

const Star = styled.span`
  cursor: pointer;
  color: ${props => (props.active ? 'gold' : 'gray')};
  font-size: 24px;
`;

const StarRating = ({ rating, setRating, readOnly }) => {
  const handleStarClick = (index) => {
    if (!readOnly) {
      setRating(index + 1);
    }
  };

  return (
    <Stars>
      {[...Array(6)].map((_, index) => (
        <Star
          key={index}
          active={index < rating}
          onClick={() => handleStarClick(index)}
        >
          ★
        </Star>
      ))}
    </Stars>
  );
};

export default StarRating;
