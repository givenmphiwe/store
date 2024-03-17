import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    height: 60px;
    position: fixed; /* Position the navbar fixed at the top */
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffff; /* Set background color */
    z-index: 1000; /* Set a high z-index to ensure it appears above other content */
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); 
`;

const Wrapper = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-top: 10px;
    padding: 5px;
    width: 150px; /* Set a fixed width for the search container */
    visibility: ${(props) => (props.hideSearch ? "hidden" : "visible")}; /* Conditionally hide based on props */
`;

const Input = styled.input`
    border: none;
    width: 100%;
    outline: none;
    font-size: 14px;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
`;

const Center = styled.div`
    text-align: center;
    margin-left: ${(props) => (props.hideSearch ? "-22rem" : "auto")};
    @media (min-width: 768px) {
    margin-left: ${(props) => (props.hideSearch ? "-60rem" : "auto")};

    }
`;

const Logo = styled.h1`
    font-weight: bold;
    font-size: 20px;
`;

const Right = styled.div`
    display: flex;
    align-items: center;
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 20px; /* Add margin between menu items */
`;

const Navbar = ({ hideSearchContainer }) => {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos]);

    return (
        <Container style={{ top: visible ? 0 : "-60px" }}>
            <Wrapper>
                <Left>
                    {/* <Language>EN</Language> */}
                    <SearchContainer hideSearch={hideSearchContainer}>
                        <Input placeholder="Search"/>
                        <Search style={{color:"gray", fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center hideSearch={hideSearchContainer}>
                    <Logo>Shop with me</Logo>
                </Center>
                <Right>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Navbar;
