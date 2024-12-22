import { useParams } from "react-router-dom"
import ProductDetails from "../features/product/components/ProductDetails"
import Navbar from "../features/navbar/Navbar";

function ProductDetailsPage() {
    const {id} = useParams();
  return (
    <Navbar><ProductDetails id = {id}/></Navbar>
  )
}

export default ProductDetailsPage