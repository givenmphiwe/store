import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
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
  const navigate = useNavigate();

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
      Gauteng: cartPrice > 600 ? 0 : 90,
      Mpumalanga: 70.0,
      Limpopo: 50.0,
      "Eastern Cape": 120.0,
      "Free State": 90.0,
      "Northern Cape": 90.0,
      "North West": 95.0,
      "Western Cape": 55.0,
      "KwaZulu-Natal": 155.0,
    };

    return deliveryFees[province] || 0;
  };

  const deliveryFee = formData
    ? calculateDeliveryFee(formData.province, totalCartPrice)
    : 0;

  const paymentTotal = parseFloat(deliveryFee) + parseFloat(totalCartPrice);

  const initiatePayment = async () => {
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
        console.log("Payment ID:", paymentData.paymentId);
        // Assuming the backend returns a URL or payment ID for redirection
        setPayFastView(paymentData.paymentId);

        // Redirect to payment gateway
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
        // @ts-ignore
        window.payfast_do_onsite_payment(
          { uuid: payFastView },
          function (result) {
            if (result === true) {
              // Payment Completed
              localStorage.setItem(
                "purchased",
                `${cartItems.map((item) => item.id).join(",")}`
              );
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

  const handleClick = () => {
    navigate(`/`);
    setIsModalOpen(false);
  };

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
            <TotalAmount>R{paymentTotal}</TotalAmount>
          </tr>
        </tfoot>
      </Table>

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
