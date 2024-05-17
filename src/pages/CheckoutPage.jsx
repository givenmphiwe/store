import React, { useState } from 'react';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  margin-top: 50px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const FormInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormSelect = styled.select`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #22802f;
  color: white;
  border: none;
  cursor: pointer;
`;

const CheckOut = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);

  // Define prices based on location
  const locationPrices = {
    Gauteng: 10,
    'Outside Gauteng': 20,
    // Add more locations and prices as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling form submission here
    console.log('Form submitted:', { name, address, location, price });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    setPrice(locationPrices[selectedLocation]); // Set price based on selected location
  };

  return (
    <CheckoutContainer>
      <h2>Checkout</h2>

      <p>I need to add the products Data to be shipped out</p>
      <CheckoutForm onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">Name:</FormLabel>
        <FormInput
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <FormLabel htmlFor="address">Address:</FormLabel>
        <FormInput
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        
        <SubmitButton type="submit">Proceed</SubmitButton>
      </CheckoutForm>
    </CheckoutContainer>
  );
};

export default CheckOut;
