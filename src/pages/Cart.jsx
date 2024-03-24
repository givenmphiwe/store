import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { CancelOutlined, DoNotDisturbAltOutlined } from '@mui/icons-material'; // Importing the cancel icon

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

// Main component
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
            const parsedCartItems = JSON.parse(cartData);
            setCartItems(parsedCartItems);
        }
    }, []);

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    const handleQuantityChange = (index, event) => {
        const updatedCartItems = [...cartItems];
        const newQuantity = event.target.value;
        const price = parseFloat(updatedCartItems[index].Price.replace("R ", "").trim());
        const newTotalPrice = price * newQuantity;
        
        updatedCartItems[index].quantity = newQuantity;
        updatedCartItems[index].totalPrice = `R ${newTotalPrice.toFixed(2)}`; // Format to two decimal places
        
        setCartItems(updatedCartItems);
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    };

    console.log("The cart items", cartItems);

    return (
        <div>
            <Navbar hideSearchContainer={true} />
            <Space/>
            {cartItems.map((item, index) => (
                <Container key={index}>
                    <RemoveButton onClick={() => removeFromCart(index)}>
                        Remove<DoNotDisturbAltOutlined style={{ color: '#808080' }} />
                    </RemoveButton>
                    <Image src={item.img} alt="Product" />
                    <Info>
                        <Description>{item.ProductName}</Description>
                        <DescriptionPrice>{item.Price}</DescriptionPrice>
                    </Info>
                    <Info>
                        <strong>QUANTITY</strong>
                        <Quantity
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(event) => handleQuantityChange(index, event)}
                        />
                    </Info>
                </Container>
            ))}
        </div>
    );
};

export default Cart;
