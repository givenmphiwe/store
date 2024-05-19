import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

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
  padding-left: 20px;
  text-align: left;
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

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const parsedCartItems = JSON.parse(cartData);
      setCartItems(parsedCartItems);
      const totalPrice = updateTotalPrice(parsedCartItems);
      setTotalCartPrice(totalPrice);
    }
  }, []);

  // I must make logic to calculate the Delivery fee Add it to the Payment total

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
            <Total colSpan="3">Total</Total>
            <TotalAmount>{totalCartPrice}</TotalAmount>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default FinalCheckOut;
