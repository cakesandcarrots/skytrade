import React from "react";
import AdminProductForm from "../features/admin/components/AdminProductForm";
import Navbar from "../features/navbar/Navbar";
function AdminProductFormPage() {
  return (
    <>
      <Navbar>
        <AdminProductForm></AdminProductForm>
      </Navbar>
    </>
  );
}

export default AdminProductFormPage;
