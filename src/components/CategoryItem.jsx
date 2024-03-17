import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  flex-shrink: 0; /* Prevent item from shrinking */
  margin-right: 10px; 
  height: 20vh;
  position: relative;
  overflow: hidden;
  display: flex; /* Display as flex for both desktop and mobile */
  flex-direction: column; /* Align children vertically */
  align-items: center; 

  @media (max-width: 768px) {
    height: auto; /* Adjust height for mobile */
    flex-direction: column-reverse; /* Reverse flex direction for mobile */
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%; /* Make the image circular */
`;

const Info = styled.div`
  position: absolute;
  bottom: 0; /* Position the info div at the bottom */
  left: 0;
  width: 100%;
  text-align: center; /* Center the text horizontally */
  background-color: rgba(255, 255, 255, 0.7); /* Add a semi-transparent background */
  padding: 10px; /* Add padding for better readability */
  box-sizing: border-box; /* Include padding in the width calculation */
`;

const Title = styled.p`
  color: black;
  margin: 0; /* Remove default margin */
  font-size: 16px; /* Adjust the font size */
  line-height: 1.4; /* Add line height for better readability */
  font-family: Arial, sans-serif; /* Use a sans-serif font */
  white-space: nowrap; /* Prevent text from wrapping */
  
  @media (max-width: 768px) {
    font-size: 14px; /* Adjust font size for smaller screens */
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default CategoryItem;
