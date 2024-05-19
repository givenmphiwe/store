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
import { useNavigate } from "react-router-dom";

const provinces = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

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

const ProvinceContainer = styled.div`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  z-index: 10;
`;

const ProvinceCard = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
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
  const [showProvinces, setShowProvinces] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      phone,
      province,
      address,
      location,
      price,
    };
    navigate("/FinalCheckOut", { formData });
  };

  const handleProvinceClick = (province) => {
    setProvince(province);
    setShowProvinces(false);
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
            <FormInput
              type="text"
              id="province"
              placeholder="Select your province"
              value={province}
              onFocus={() => setShowProvinces(true)}
              onChange={(e) => {
                setProvince(e.target.value);
                setShowProvinces(true);
              }}
              required
            />
            <ProvinceContainer show={showProvinces}>
              {provinces
                .filter((provinceItem) =>
                  provinceItem.toLowerCase().includes(province.toLowerCase())
                )
                .map((province, index) => (
                  <ProvinceCard
                    key={index}
                    onClick={() => handleProvinceClick(province)}
                  >
                    {province}
                  </ProvinceCard>
                ))}
            </ProvinceContainer>
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
