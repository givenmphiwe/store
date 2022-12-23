import styled from "styled-components"
import { popularProducts } from "../data"
import Product from "./Product"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap
`;

const Products = () => {
  return (
    <Container>
        {popularProducts.map(item=>(
            <Product key={item.id} item={item}/>
        ))}
    </Container>
  )
}
//I stoped at 01:06:50 to be con
export default Products