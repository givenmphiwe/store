import React from "react";
import { popularProducts } from "../data";
import { useParams } from "react-router-dom";

const ProductsPage = () => {
 const { id } = useParams();

    // Find the product with the matching id
    const product = popularProducts.find(product => product.id === parseInt(id));

    return (
        <div>
            {product && (
                <img src={product.img} alt={`Product ${id}`} />
            )}
        </div>
    );
};

export default ProductsPage;