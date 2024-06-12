import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { database } from "../firebaseConfig";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #22802f;
  color: white;
  border: none;
  align-content: center;
  display: flex;
  font-size: 18px;
  font-weight: bolder;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  margin: auto;
  margin-top: 70px;

  @media (max-width: 768px) {
    /* Add specific styling for smaller screens if needed */
  }
`;

const DoneButtonModal = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #22802f;
  color: white;
  border: none;
  align-content: center;
  display: flex;
  font-size: 18px;
  font-weight: bolder;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  margin: auto;

  @media (max-width: 768px) {
    /* Add specific styling for smaller screens if needed */
  }
`;

const FinalCheckOut = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [formData, setFormData] = useState(null);
  const [payFastView, setPayFastView] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nextDayDelivery, setNextDayDelivery] = useState(false); // State for next day delivery
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);

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

  const toggleNextDayDelivery = () => {
    setNextDayDelivery(!nextDayDelivery);
  };

  const calculateDeliveryFee = (province, cartPrice) => {
    // Define base delivery fee and additional charges for next day delivery
    const baseDeliveryFee = {
      Gauteng: cartPrice > 600 ? 0 : 90.0,
      Mpumalanga: 170.0,
      Limpopo: 120.0,
      "Eastern Cape": 120.0,
      "Free State": 120.0,
      "Northern Cape": 120.0,
      "North West": 95.0,
      "Western Cape": 120.0,
      "KwaZulu-Natal": 130.0,
    };

    // Additional charge for next day delivery
    const nextDayDeliveryCharge = 100.0;

    // Calculate delivery fee based on province and additional charges
    let deliveryFee = baseDeliveryFee[province] || 0;
    if (nextDayDelivery) {
      // Check if next day delivery is selected
      deliveryFee += nextDayDeliveryCharge;
    }

    return deliveryFee;
  };

  const deliveryFee = formData
    ? calculateDeliveryFee(formData.province, totalCartPrice)
    : 0;

  const paymentTotal = parseFloat(deliveryFee) + parseFloat(totalCartPrice);

  const initiatePayment = async () => {
    setShowNavbar(false);
    try {
      const response = await fetch("http://localhost:3000/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: cartItems.map((item) => item.ProductName).join(", "),
          productQuantity: cartItems
            .reduce((total, item) => total + item.quantity, 0)
            .toString(),
          paymentTotal: paymentTotal.toString(),
          userName: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
        }),
      });

      if (response.ok) {
        const paymentData = await response.json();
        await insertSaleRecord(paymentData.paymentId);
        // console.log("Payment ID:", paymentData.paymentId);
        setPayFastView(paymentData.paymentId);
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    if (payFastView) {
      const script = document.createElement("script");
      script.src = "https://www.payfast.co.za/onsite/engine.js";
      script.async = true;
      script.onload = () => {
        window.payfast_do_onsite_payment(
          { uuid: payFastView },
          function (result) {
            if (result === true) {
              localStorage.setItem(
                "purchased",
                cartItems.map((item) => item.id).join(",")
              );
              localStorage.setItem("User-purchased", formData.name);
              setIsModalOpen(true);
            } else {
              // Payment Window Closed
            }
          }
        );
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [payFastView]);

  const insertSaleRecord = async (paymentId) => {
    try {
      const productId = cartItems.map((item) => item.id).join(", ");
      const salesRef = database.ref(`products/${productId}/sales`);

      await salesRef.set({
        paymentId: paymentId,
        cartItems: cartItems,
        formData: formData,
        paymentTotal: paymentTotal,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
    } catch (error) {
      console.error("Error inserting sale record:", error);
    }
  };

  const handleClick = () => {
    navigate(`/`);
    setIsModalOpen(false);
  };

  return (
    <>
      {showNavbar && <Navbar hideCartIcon={true} hideSearchContainer={true} />}
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
            <TotalAmount>R{paymentTotal}</TotalAmount>
          </tr>
        </tfoot>
      </Table>

      <FormControlLabel
        control={
          <Switch checked={nextDayDelivery} onChange={toggleNextDayDelivery} />
        }
        label="Next Day Delivery (R100) added to delivery fee"
      />

      <SubmitButton onClick={initiatePayment}>PAY NOW</SubmitButton>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleClick}
        contentLabel="Payment Confirmation"
        ariaHideApp={false}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h2>Payment Successful</h2>
          <FontAwesomeIcon icon={faCheckCircle} size="3x" color="green" />
          <p>
            Thank you for your purchase. A confirmation email has been sent to
            you.
          </p>
          <DoneButtonModal onClick={handleClick}>Ok</DoneButtonModal>
        </div>
      </Modal>
    </>
  );
};

export default FinalCheckOut;
