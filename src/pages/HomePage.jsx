import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
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