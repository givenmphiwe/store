import styled from "styled-components";

const Container = styled.div`
    height: 30px;
    background-color: teal;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    position: fixed; /* Position the Announcement component fixed at the top */
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; /* Ensure the Announcement component appears above other content */
`;

const Annoucement = () => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over R600
        </Container>
    )
}

export default Annoucement;
