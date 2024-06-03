import styled from "styled-components";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import React, { useRef, useEffect, useState } from "react";
import { database } from "../firebaseConfig"; 
import { ref, onValue } from "firebase/database"; 

const Container = styled.div`
  position: relative;
  display: flex;
  padding: 20px;
  margin-top: 60px;
  overflow-x: auto;
  scroll-behavior: smooth;
  flex: 1;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const CategoriesText = styled.div`
  position: relative;
  top: 60px;
  left: 0px;
  margin-left: 10px;
  font-weight: bold;
  bottom: 10px;
  padding: 0px;
  font-size: 20px;
`;

const ScrollLeftIcon = styled(ArrowLeftOutlined)`
  cursor: pointer;
  margin-right: 10px;
`;

const ScrollRightIcon = styled(ArrowRightOutlined)`
  cursor: pointer;
  margin-left: 10px;
`;

const ItemContainer = styled.div`
  flex-shrink: 0;
  width: 130px;
  text-align: center;
`;

const Image = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.p`
  margin-top: 10px;
`;

const Categories = ({ onCategoryClick }) => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [autoScroll, setAutoScroll] = useState(true);

  // Fetch categories from Firebase Realtime Database
  useEffect(() => {
    const categoriesRef = ref(database, 'categories'); // Adjust the path to your Firebase structure
    onValue(categoriesRef, (snapshot) => {
      const data = snapshot.val();
      const categoryList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
      setCategories(categoryList);
    });
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    let intervalId;

    const scrollRight = () => {
      container.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    };

    const handleScroll = () => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRight();
      }
    };

    if (autoScroll) {
      intervalId = setInterval(() => {
        handleScroll();
      }, 6000);
    }

    return () => clearInterval(intervalId);
  }, [autoScroll]);

  const handleContainerScroll = () => {
    setAutoScroll(false);
  };

  return (
    <>
      <CategoriesText>Categories</CategoriesText>
      <Container ref={scrollRef} onScroll={handleContainerScroll}>
        {categories.map((item) => (
          <ItemContainer key={item.id} onClick={() => onCategoryClick(item.title)}>
            <Image src={item.img} alt={item.title} />
            <Title>{item.title}</Title>
          </ItemContainer>
        ))}
      </Container>
    </>
  );
};

export default Categories;
