import { FavoriteBorderOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    flex: 1;
    margin: 5px;
    width: 90px; 
    height: 250px;
    background-color: #fff;
    border-radius: 8px; 
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px; /* Add margin to create spacing between cards */

    /* For desktop: */
    @media (min-width: 768px) {
        width: calc(33.33% - 20px); /* Adjust width to fit three cards per row */
    }

    /* For mobile: */
    @media (max-width: 768px) {
        width: calc(50% - 20px); /* Adjust width to fit two cards per row */
    }
`;

const Image = styled.img`
    height: 70%;
    align-self: center;
    @media (max-width: 768px) {
        height: 45%
    }
`;

const Info = styled.div`
    display: flex;
    position: relative;
    right: 40px;

    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start; 
    padding-top: 20px; 
`;



const Description = styled.p`
    margin-bottom: 15px;
    text-align: left;
    font-weight: 300;
`;

const DescriptionPrice = styled.p`
font-weight: 600;
font-size: 20px
`

// Main component
const Product = ({ item }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the ProductSelected page with the item ID or any necessary parameter
        navigate(`/productSelected/${item.id}`); // Example: Use item ID as parameter
    };

    return (
        <Container onClick={handleClick}>

            <Image src={item.img} alt="Product" />
            <Info>
                <Description>{item.ProductName}</Description>
                <DescriptionPrice>{item.Price}</DescriptionPrice>


            </Info>
           
        </Container>
    );
};

export default Product;
