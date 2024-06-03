import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Product from "./Product";
import { database } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const NoItemsMessage = styled.p`
  text-align: center;
  width: 100%;
  font-size: 23px;
  color: #888;
  font-weight: bold;
`;

const Products = ({ searchQuery, selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from Firebase Realtime Database
  useEffect(() => {
    const productsRef = ref(database, "products");
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const productList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setProducts(productList);
    });
  }, []);

  console.log("The products selected passed param", selectedCategory);
  // Filter products based on search query and selected category whenever they change
  useEffect(() => {
    let filtered = products;

    // Filter based on search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) =>
        item.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter based on selected category
    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <Container>
      {filteredProducts.length === 0 ? (
        <NoItemsMessage>No items found.</NoItemsMessage>
      ) : (
        filteredProducts.map((item) => <Product key={item.id} item={item} />)
      )}
    </Container>
  );
};

export default Products;
