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
import { useNavigate } from 'react-router-dom';

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
  width: 95%;
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

 

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare data to be passed to the next page
    const formData = {
      name,
      email,
      phone,
      province,
      address,
      location,
      price,
    };

    // Navigate to the next page while passing form data as state
    navigate("/nextPage", { formData });
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
              
              placeholder="e.g 0720877233"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormGroup>

          <FormLabel htmlFor="province">Province</FormLabel>
<FormGroup>
  <FormIcon icon={faMapMarkedAlt} />
  <FormSelect
    id="province"
    value={province}
    onChange={(e) => setProvince(e.target.value)}
    required
  >
    <option value="">Select your province</option>
    <option value="Eastern Cape">Eastern Cape</option>
    <option value="Free State">Free State</option>
    <option value="Gauteng">Gauteng</option>
    <option value="KwaZulu-Natal">KwaZulu-Natal</option>
    <option value="Limpopo">Limpopo</option>
    <option value="Mpumalanga">Mpumalanga</option>
    <option value="Northern Cape">Northern Cape</option>
    <option value="North West">North West</option>
    <option value="Western Cape">Western Cape</option>
  </FormSelect>
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
