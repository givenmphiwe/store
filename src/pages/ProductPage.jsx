import React, { useState } from "react";
import { popularProducts } from "../data";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { Favorite } from "@mui/icons-material"; // Importing the Favorite icon from Material-UI

const Container = styled.div`
  flex: 1;
  margin: 5px auto; /* Set left and right margins to auto to center horizontally */
  width: 100%; /* Set width to 100% */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const ContainerInStock = styled.div`
  flex: 1;
  margin: 5px auto; 
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px -4px 8px rgba(0, 0, 0, 0.2); 
  font-weight: bold; 
`;
const ContainerDescription = styled.div`
  flex: 1;
  margin: 5px auto; 
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 70px; /* Add margin-bottom to create space for the button */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px -4px 8px rgba(0, 0, 0, 0.2); 
  font-weight: bold; 
`;

const Image = styled.img`
  margin-bottom: 30px;
  height: 200px;
  align-self: center;
  margin-top: auto; /* Push image to the center of the container */
  margin-bottom: auto; /* Push image to the center of the container */
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const SmallImagesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */

  justify-content: center;
`;

const SmallImage = styled.img`
  height: 50px; 
  margin-right: 10px; 
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 5px;

  &:hover {
    border-color: blue; 
  }
`;

const LoveIcon = styled(Favorite)`
  color: red;
  font-size: 24px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const AddToCartContainer = styled.div`
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

const AddToCartButton = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2); /* Tiny shadow */

  &:hover {
    background-color: #0056b3;
  }
`;



const ProductInfo = styled.div`
  margin-top: 20px;
  text-align: left; /* Align text to the left */
  width: 100%; /* Ensure full width */
  max-width: 300px; /* Limit the width to avoid stretching on larger screens */
  margin-left: 20px; /* Push to the left */
  margin-right: auto; /* Push to the left */
`;

const Price = styled.p`
  text-decoration: line-through; 
  margin-left: 10px;
  font-size:  1.5rem;
`;

const ProductPrice = styled.span`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ReviewLink = styled.span`
  text-decoration: underline;
  display: inline-block;
  color: #00008b;
`;

const GoldStar = styled.span`
  color: gold;
`;

const RowLine = styled.hr`
  margin: 10px 0; /* Add some margin above and below the line */
  width: 100%;
  border: none;
  border-top: 1px solid #ccc; /* Define line style */
`;

const CircleImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 10px;
`;

const ProductName = styled.p`
  text-align: center;
`;

const ShowMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px
`;

const ShowMoreButton = styled.button`
  background-color: transparent;
  border: 2px solid black; 
  border-radius: 20px; 
  padding: 10px 20px; 
  cursor: pointer;
  color: black;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 10px;
  
  &:hover {
    
    color: black;
  }
`;

const ProductsPage = () => {
    const { id } = useParams();
    const product = popularProducts.find((product) => product.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(product?.img || "");

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const randomProducts = popularProducts
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

    const handleAddToCart = () => {
        // Add your logic to add the product to the cart
        console.log("Product added to cart:", product);
    };

    const [showFullDescription, setShowFullDescription] = useState(false);

    // Function to toggle show/hide full description
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };


    return (
        <>
            <Navbar hideSearchContainer={true} />
            <Container>
                {product && <Image src={selectedImage} alt={`Product ${id}`} />}
                {product && product.additionalImages && product.additionalImages.length > 0 && (
                    <SmallImagesContainer>
                        {product.additionalImages.map((image, index) => (
                            <SmallImage
                                key={index}
                                src={image}
                                alt={`Product ${id} Image ${index}`}
                                onClick={() => handleImageClick(image)}
                            />
                        ))}
                    </SmallImagesContainer>
                )}
            </Container>
            {product && product.additionalImages && product.additionalImages.length > 0 && (
                <ProductInfo>
                    <h2>{product.ProductName}</h2>
                    <p>{product.productDescription}</p>

                    <ReviewLink>Write a review</ReviewLink> <GoldStar>★</GoldStar>
                    {product.ProductStarRating}

                    <ProductPrice>
                        <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>{product.Price}</span>{" "}
                        <Price>{product.CancalledPrice}</Price>
                    </ProductPrice>
                </ProductInfo>
            )}
            <ContainerInStock>
                <ProductInfo>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>In Stock</h3>
                    <RowLine />
                    <GoldStar>★</GoldStar> Eligible for next day delivery
                    <RowLine />
                    Hassle-Free Exchange & Returns
                    <RowLine />
                    6-Month Limited Warranty
                    <RowLine />
                </ProductInfo>
            </ContainerInStock>


            <ProductInfo>
                <h3>You Might Also Like</h3>
                <SmallImagesContainer>
                    {randomProducts.map((product, index) => (

                        product.id !== parseInt(id) && (
                            <Link key={index} to={`/productSelected/${product.id}`}>
                                <div>
                                    <CircleImage src={product.img} alt={`Product ${product.id}`} />
                                    <ProductName>{product.ProductName}</ProductName>
                                </div>
                            </Link>
                        )
                    ))}
                </SmallImagesContainer>
            </ProductInfo>

            <ContainerDescription>
                <ProductInfo>
                    <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Description</h3>
                    {product && product.additionalImages && product.additionalImages.length > 0 && (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: showFullDescription ? product.Description : product.Description.slice(0, 100) }} style={{ whiteSpace: 'pre-line' }} />
                            {product.Description.length > 100 && (
                               <ShowMoreButtonContainer>
                               <ShowMoreButton onClick={toggleDescription}>
                                 {showFullDescription ? "Show Less" : "Show More"}
                               </ShowMoreButton>
                             </ShowMoreButtonContainer>
                            )}
                        </>
                    )}
                </ProductInfo>
            </ContainerDescription>

            <AddToCartContainer>
                <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
            </AddToCartContainer>
        </>
    );
};

export default ProductsPage;
