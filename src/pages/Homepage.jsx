import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productlist/ProductList";
export default function Homepage(){
    return (
        <>
        <Navbar>
        <ProductList></ProductList>
        </Navbar>
        </>
    )
}