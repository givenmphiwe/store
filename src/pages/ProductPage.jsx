import React, { useEffect, useState } from "react";
import { popularProducts } from "../data";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SlidingNotification from "../components/SlidingNotification";
import styled from "styled-components";
import { CalendarMonth, ReplayOutlined } from "@mui/icons-material"; // Importing the Favorite icon from Material-UI
import { StarRateOutlined, LocalShipping } from "@mui/icons-material";

const Container = styled.div`
  flex: 1;
  margin: 5px auto;
  width: 100%;
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
  margin-bottom: 70px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2), 0px -4px 8px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;

const Image = styled.img`
  margin-bottom: 30px;
  height: 200px;
  align-self: center;
  margin-top: auto;
  margin-bottom: auto;
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const SmallImagesContainer = styled.div`
  margin-top: 20px;
  display: flex;
  overflow-x: auto;
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

const ReturnIcon = styled(ReplayOutlined)`
  color: black;
  font-size: 24px;
  position: relative;
  top: 5px;
`;

const DeliveryIcon = styled(LocalShipping)`
  color: black;
  font-size: 24px;
  position: relative;
  top: 5px;
`;

const StarDeliveryIcon = styled(StarRateOutlined)`
  color: black;
  font-size: 24px;
  position: relative;
  top: 5px;
`;

const AddToCartContainer = styled.div`
  position: fixed;
  left: 50%;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateX(-50%);
  z-index: 999;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  border-radius: 30px;
  width: 230px;
  background-color: #22802f;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #22802f;
  }
`;

const ProductInfo = styled.div`
  margin-top: 20px;
  text-align: left;
  width: 100%;
  max-width: 300px;
  margin-left: 20px;
  margin-right: auto;
`;

const Price = styled.p`
  text-decoration: line-through;
  margin-left: 10px;
  font-size: 1.5rem;
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
  cursor: pointer;
`;

const GoldStar = styled.span`
  color: gold;
`;

const GoldSta = styled.span`
  color: grey;
`;

const RowLine = styled.hr`
  margin: 10px 0;
  width: 100%;
  border: none;
  border-top: 1px solid #ccc;
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
  margin-bottom: 10px;
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

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
`;

const ReviewTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const SubmitReviewButton = styled.button`
  padding: 10px;
  background-color: #22802f;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-bottom: 10rem;

  &:hover {
    background-color: #1a6623;
  }
`;

const ReviewList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ReviewItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ProductsPage = () => {
  const { id } = useParams();
  const product = popularProducts.find(
    (product) => product.id === parseInt(id)
  );
  const [selectedImage, setSelectedImage] = useState(product?.img || "");
  const [selectedName, setSelectedProducted] = useState(
    product?.ProductName || ""
  );
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [cartItemCount, setCartItemCount] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewSectionOpen, setReviewSectionOpen] = useState(false);

  useEffect(() => {
    const savedReviews =
      JSON.parse(localStorage.getItem(`reviews-${id}`)) || [];
    setReviews(savedReviews);
  }, [id]);

  const purchasedItems = localStorage.getItem("purchased");

  //I must get the item If the id is valid to be matched with the selected item
  console.log("The items", purchasedItems);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const randomProducts = popularProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 10);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const isItemInCart = cartItems.some((item) => item.id === product.id);

    if (isItemInCart) {
      setNotificationMessage("Already in your cart.");
      setShowNotification(true);
    } else {
      const productWithQuantity = { ...product, quantity: 1 };
      const newCartItems = [...cartItems, productWithQuantity];
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      setCartItemCount(newCartItems.length);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle show/hide full description
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  //Fetching reviews from the server

  useEffect(() => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!reviewText.trim()) {
      alert("Review text cannot be empty");
      return;
    }

    const newReview = {
      ProductName: selectedName,
      text: reviewText,
    };

    fetch(`http://localhost:3000/reviews/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setReviews([...reviews, data]);
        setReviewText("");
      })
      .catch((error) => console.error("Error submitting review:", error));
  };

  useEffect(() => {
    // Scroll to the top of the page when component mounts or updates
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar hideSearchContainer={true} />
      <Container>
        {product && <Image src={selectedImage} alt={`Product ${id}`} />}
        {product &&
          product.additionalImages &&
          product.additionalImages.length > 0 && (
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
      {product &&
        product.additionalImages &&
        product.additionalImages.length > 0 && (
          <ProductInfo>
            <h2>{product.ProductName}</h2>
            <p>{product.productDescription}</p>
            {/* <ReviewLink>Write a review</ReviewLink> <GoldStar>★</GoldStar> */}
            {product.ProductStarRating}
            <ProductPrice>
              <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
                {product.Price}
              </span>{" "}
              <Price>{product.CancalledPrice}</Price>
            </ProductPrice>
          </ProductInfo>
        )}
      <ContainerInStock>
        <ProductInfo>
          <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>In Stock</h3>
          <RowLine />
          <StarDeliveryIcon />
          Eligible for next day delivery
          <RowLine />
          <ReturnIcon />
          Hassle-Free Exchange & Returns
          <RowLine />
          <DeliveryIcon /> Delivery in 2 - 5 days
          <RowLine />
        </ProductInfo>
      </ContainerInStock>
      <ProductInfo>
        <h3>You Might Also Like</h3>
        <SmallImagesContainer>
          {randomProducts.map(
            (product, index) =>
              product.id !== parseInt(id) && (
                <Link key={index} to={`/productSelected/${product.id}`}>
                  <div>
                    <CircleImage
                      src={product.img}
                      alt={`Product ${product.id}`}
                    />
                    <ProductName>{product.ProductName}</ProductName>
                  </div>
                </Link>
              )
          )}
        </SmallImagesContainer>
      </ProductInfo>
      <ContainerDescription>
        <ProductInfo>
          <h3 style={{ fontWeight: "bold", fontSize: "1.2em" }}>Description</h3>
          {product &&
            product.additionalImages &&
            product.additionalImages.length > 0 && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: showFullDescription
                      ? product.Description
                      : product.Description.slice(0, 100),
                  }}
                  style={{ whiteSpace: "pre-line" }}
                />
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
      <ProductInfo>
        <h3>Customer Reviews</h3>
        <ReviewForm onSubmit={handleReviewSubmit}>
          <ReviewTextArea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            rows="4"
            placeholder="Write your review here"
          />
          {product.id === purchasedItems ? (
            <>
              <SubmitReviewButton type="submit">
                Submit Review
              </SubmitReviewButton>
            </>
          ) : (
            <></>
          )}
        </ReviewForm>
        <ReviewList>
          {reviews.map((review, index) => (
            <ReviewItem key={index}>
              <p>{review.text}</p>
              <small>{new Date(review.date).toLocaleString()}</small>
            </ReviewItem>
          ))}
        </ReviewList>
      </ProductInfo>
      <AddToCartContainer>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
      </AddToCartContainer>
    </>
  );
};

export default ProductsPage;
