import styled from "styled-components"
import { categories } from "../data"
import CategoryItem from "./CategoryItem"

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    margin-top: 60px;
`;
//items are added from data.js files . mappijng them to that
const Categories = () => {
  return (
    <Container>
        {categories.map(item=>(
            <CategoryItem key={item.id} item={item}/>
        ))}
    </Container>
  )
}

export default Categories