import AdminProductList from "../features/admin/components/AdminProductList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
function AdminHomePage(){
    return (
        <>
        <Navbar>
        <AdminProductList></AdminProductList>
        </Navbar>
        <Footer></Footer>
        </>
    )
}

export default AdminHomePage;