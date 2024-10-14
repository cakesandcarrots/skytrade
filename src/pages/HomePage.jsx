import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/productlist/ProductList";
 function Homepage(){
    return (
        <>
        <Navbar>
        <ProductList></ProductList>
        </Navbar>
        </>
    )
}

export default Homepage