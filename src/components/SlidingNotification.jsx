import React, { useState } from 'react';
import styled from 'styled-components';

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  transition: transform 0.9s ease-in-out;
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(100%)'};
`;

const SlidingNotification = ({ message }) => {
  const [show, setShow] = useState(true);

  // Hide notification after 3 seconds
  setTimeout(() => {
    setShow(false);
  }, 6000);

  return (
    <Notification show={show}>
      {message}
    </Notification>
  );
};

export default SlidingNotification;
