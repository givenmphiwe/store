import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { DoNotDisturbAltOutlined } from "@mui/icons-material"; // Importing the cancel icon
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 160px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between; /* Adjusted */
  padding: 10px;
  position: relative; /* Added position relative */

  /* For desktop: */
  @media (min-width: 768px) {
    width: calc(33.33% - 20px);
  }

  /* For mobile: */
  @media (max-width: 768px) {
    width: calc(90% - 10px);
  }
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  margin-right: 10px;
`;

const Space = styled.img`
  margin-bottom: 60px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Description = styled.p`
  margin-bottom: 15px;
  text-align: left;
  font-weight: 300;
`;

const DescriptionPrice = styled.p`
  font-weight: 600;
  font-size: 20px;
`;

const Quantity = styled.input`
  width: 50px;
  padding: 5px;
  border: 1px solid #ccc;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 5px; /* Adjust top position */
  right: 5px; /* Adjust right position */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckoutContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100%;
  display: flex; /* Add flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  transform: translateX(-50%);
  z-index: 999; /* Ensure it stays above other elements */
  background-color: white;
  border: 1px solid #ccc; /* Add border for visual separation */
  border-radius: 10px;
`;

const AddCheckOutButton = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  width: 200px;
  background-color: #22802f;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  margin-right: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Tiny shadow */

  &:hover {
    background-color: #22802f;
  }
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  font-size: 16px;
`;

const QuantityDisplay = styled.span`
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
`;

const updateTotalPrice = (items) => {
  const totalPrice = items
    .reduce((total, item) => {
      console.log("item:", item);
      //const price = parseFloat(item.Price.replace("R ", ""));
      const price = item.Price.replace(/[^\d.]/g, ''); 
      console.log("price:", price);
      console.log("quantity:", item.quantity);
      return total + price * item.quantity;
    }, 0)
    .toFixed(2);

  console.log("totalPrice:", totalPrice);
  return totalPrice;
};
// Main component
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    console.log("cartData:", cartData);
    if (cartData) {
      const parsedCartItems = JSON.parse(cartData);

      setCartItems(parsedCartItems);
      const totalPrice = updateTotalPrice(parsedCartItems);

      setTotalCartPrice(totalPrice);
    }
  }, []);

  const removeFromCart = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
    setTotalCartPrice(updateTotalPrice(updatedCartItems));
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleIncrement = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
    const totalPrice = updateTotalPrice(updatedCartItems); // Update total price
    setTotalCartPrice(totalPrice);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
  };

  const handleDecrement = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);
      const totalPrice = updateTotalPrice(updatedCartItems); // Update total price
      setTotalCartPrice(totalPrice);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    }
  };

  const handleCheckoutClick = () => {
    navigate(`/checkout`);
  };

  return (
    <div>
      <Navbar hideSearchContainer={true} />
      <Space />
      {cartItems.map((item, index) => (
        <Container key={index}>
          <RemoveButton onClick={() => removeFromCart(index)}>
            Remove
            <DoNotDisturbAltOutlined style={{ color: "#808080" }} />
          </RemoveButton>
          <Image src={item.img} alt="Product" />
          <Info>
            <Description>{item.ProductName}</Description>
            <DescriptionPrice>{item.Price}</DescriptionPrice>
          </Info>
          <Info>
            <strong>QUANTITY</strong>
            <QuantityContainer>
              <QuantityButton onClick={() => handleDecrement(index)}>
                -
              </QuantityButton>
              <QuantityDisplay>{item.quantity}</QuantityDisplay>
              <QuantityButton onClick={() => handleIncrement(index)}>
                +
              </QuantityButton>
            </QuantityContainer>
          </Info>
        </Container>
      ))}

      <CheckoutContainer>
        <AddCheckOutButton onClick={handleCheckoutClick}>
          CheckOut
        </AddCheckOutButton>
        <p style={{ fontSize: "20px", color: "black", fontWeight: 600 }}>
          TOTAL R{totalCartPrice}
        </p>
      </CheckoutContainer>
    </div>
  );
};

export default Cart;
