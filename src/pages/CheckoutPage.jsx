import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faMapMarkedAlt,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../components/Navbar";

const CheckoutContainer = styled.div`
  margin-top: 70px;
  padding-left: 10px;
  padding-right: 10px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const FormIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 10px;
  left: 10px;
  color: #ccc;
`;

const FormInput = styled.input`
  width: 80%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px 10px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #22802f;
  color: white;
  border: none;
  width: 90%;
  cursor: pointer;
`;

const CheckOut = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);

  // Define prices based on location
  const locationPrices = {
    Gauteng: 10,
    "Outside Gauteng": 20,
    // Add more locations and prices as needed
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling form submission here
    console.log("Form submitted:", {
      name,
      email,
      phone,
      province,
      address,
      location,
      price,
    });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    setPrice(locationPrices[selectedLocation]); // Set price based on selected location
  };

  return (
    <>
      <Navbar hideCartIcon={true} hideSearchContainer={true} />
      <CheckoutContainer>
        <h2>Complete Your Purchase</h2>
        <CheckoutForm onSubmit={handleSubmit}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormGroup>
            <FormIcon icon={faUser} />
            <FormInput
              type="text"
              id="name"
              placeholder="Name and Surname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>

          <FormLabel htmlFor="email">Email Address</FormLabel>
          <FormGroup>
            <FormIcon icon={faEnvelope} />
            <FormInput
              type="email"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>

          <FormLabel htmlFor="phone">Phone Number</FormLabel>
          <FormGroup>
            <FormIcon icon={faPhone} />
            <FormInput
              type="number"
              id="phone"
              max="12"
              placeholder="e.g 0720877233"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormGroup>

          <FormLabel htmlFor="province">Province</FormLabel>
          <FormGroup>
            <FormIcon icon={faMapMarkedAlt} />
            <FormInput
              type="text"
              id="province"
              placeholder="Select your province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
            />
          </FormGroup>

          <FormLabel htmlFor="address">Address</FormLabel>
          <FormGroup>
            <FormIcon icon={faLocationArrow} />
            <FormInput
              type="text"
              id="address"
              placeholder="Enter your delivery address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </FormGroup>

          <SubmitButton type="submit">Proceed</SubmitButton>
        </CheckoutForm>
      </CheckoutContainer>
    </>
  );
};

export default CheckOut;
