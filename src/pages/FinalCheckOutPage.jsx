import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const updateTotalPrice = (items) => {
  const totalPrice = items
    .reduce((total, item) => {
      const price = parseFloat(item.Price.replace("R ", ""));
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  return totalPrice;
};

const Table = styled.table`
  width: 100%;
  margin-top: 70px;
  border-collapse: collapse;
`;

const Th = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  background: grey;
  color: white;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const Total = styled.td`
  border-bottom: 1px solid #ddd;

  text-align: right;
  font-weight: bolder;
`;

const TotalAmount = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: center;
  font-weight: bolder;
`;

const FinalCheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartItems = JSON.parse(cartData);
      setCartItems(parsedCartItems);
      const totalPrice = updateTotalPrice(parsedCartItems);
      setTotalCartPrice(totalPrice);
    }

    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const calculateDeliveryFee = (province, cartPrice) => {
    const deliveryFees = {
      Gauteng: cartPrice > 500 ? 0 : 50,
      Mpumalanga: 70.0,
      Limpopo: 50.0,
      "Eastern Cape": 80.0,
      "Free State": 90.0,
      "Northern Cape": 90.0,
      "North West": 65.0,
      "Western Cape": 60.0,
      "KwaZulu-Natal": 65.0,
    };

    return deliveryFees[province] || 0;
  };

  const deliveryFee = formData
    ? calculateDeliveryFee(formData.province, totalCartPrice)
    : 0;

  // const paymentTotal = deliveryFee + totalCartPrice ;

  return (
    <>
      <Navbar hideCartIcon={true} hideSearchContainer={true} />
      <Table>
        <thead>
          <tr>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
            <Th>Total Price</Th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <Td>{item.ProductName}</Td>
              <Td>{item.Price}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                {(
                  parseFloat(item.Price.replace("R ", "")) * item.quantity
                ).toFixed(2)}
              </Td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <Total colSpan="3">Delivery Fee</Total>
            <TotalAmount>R{deliveryFee}</TotalAmount>
          </tr>
          <tr>
            <Total colSpan="3">Total</Total>
            <TotalAmount>R{totalCartPrice}</TotalAmount>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default FinalCheckOut;
