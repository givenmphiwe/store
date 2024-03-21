import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

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

const Products = ({ searchQuery,onCategoryClick }) => {
    // Initialize filteredProducts state
    const [filteredProducts, setFilteredProducts] = useState(popularProducts);

    // Filter products based on search query whenever searchQuery changes
    
    useEffect(() => {
      let filtered = popularProducts;

      // Filter based on search query
      if (searchQuery.trim() !== "") {
          filtered = filtered.filter(item =>
              item.ProductName.toLowerCase().includes(searchQuery.toLowerCase()) 
          );
      }

      // Filter based on category
      if (onCategoryClick !== "") {
          filtered = filtered.filter(item =>
              item.category.toLowerCase() === onCategoryClick.toLowerCase()
          );
      }

      setFilteredProducts(filtered);
      
  }, [searchQuery, onCategoryClick]);
    

    return (
        <Container>
            {filteredProducts.length === 0 ? (
                <NoItemsMessage>No items found.</NoItemsMessage>
            ) : (
                filteredProducts.map(item => (
                    <Product key={item.id} item={item} />
                ))
            )}
        </Container>
    );
};

export default Products;
