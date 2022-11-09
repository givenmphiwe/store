import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import { useState } from "react";
import styled from "styled-components"

const Container =  styled.div`
width: 100%;
height: 100vh;
display: flex;
position: relative;
overflow: hidden`;

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position : absolute;
    top: 0;
    bottom: 0;
    left: ${props=> props.direction == "left" && "10px"};
    right: ${props=> props.direction == "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2`;

const Wrapper = styled.div`
    height: 100;
    display: flex;
    trasform:translateX(0vw)`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #${props=> props.bg}`;
const ImgContainer = styled.div`
height: 100%;
flex: 1`;

const Image = styled.img`
    height: 80%
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px
    `;
const Tittle = styled.h1`
    font-size: 70px;
    `;

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px
    `;

const Button= styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
    `;


const Slider = () => {

    const [slideIndez, setSlideIndex] = useState(0);
    const handleClick = (direction) => {}
    return (
        <Container>
            <Arrow direction="left" onClick={()=>handleClick("left")}>
                <ArrowLeftOutlined/>
            </Arrow>

            <Wrapper>
                <Slide bg="f5fafd">
                <ImgContainer>
                    <Image src="//cdn.shopify.com/s/files/1/0591/0645/products/GresCabotinedeGres100mlEDT_large.jpg?v=1658142531"/> 
                </ImgContainer>

                <InfoContainer>
                    <Tittle>SUMMER SALE</Tittle>
                        <Desc>DON'T COMPROMISE ON STYLE AND SWAG</Desc>
                    <Button>SHOP NOW</Button>

                </InfoContainer>
                </Slide>

                <Slide bg="fcf1ed">
                <ImgContainer>
                    <Image src="//cdn.shopify.com/s/files/1/0591/0645/products/GresCabotinedeGres100mlEDT_large.jpg?v=1658142531"/> 
                </ImgContainer>

                <InfoContainer>
                    <Tittle>SUMMER SALE</Tittle>
                        <Desc>DON'T COMPROMISE ON STYLE AND SWAG</Desc>
                    <Button>SHOP NOW</Button>

                </InfoContainer>
                </Slide>
            </Wrapper>

            <Arrow direction="right" onClick={()=>handleClick("right")}>
                <ArrowRightOutlined/>
            </Arrow>
        </Container>
    )
}

export default Slider