import { useParams } from "react-router-dom"
import ProductDetails from "../features/product/components/ProductDetails"

function ProductDetailsPage() {
    const {id} = useParams();
  return (
    <ProductDetails id = {id}/>
  )
}

export default ProductDetailsPage