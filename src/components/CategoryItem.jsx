import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Image = styled.img`
  width: 70%;
  height: 70%;
  object-fit: cover;
  border-radius: 50%; /* Make the image circular */
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  color: black;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 10px; /* Corrected syntax */
  }
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const MobileContainer = styled(Container)`
  height: auto;
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileInfo = styled(Info)`
  position: relative;
`;

const CategoryItem = ({ item }) => {
  return (
    <>
      <Container>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
        </Info>
      </Container>
      <MobileContainer>
        <Image src={item.img} />
        <MobileInfo>
          <Title>{item.title}</Title>
        </MobileInfo>
      </MobileContainer>
    </>
  );
};

export default CategoryItem;
