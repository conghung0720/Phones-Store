import React from "react";
import Sidebar from "./Sidebar";
import AddProduct from "./Products/AddProduct";
import ProductList from "./Products/ProductList";
import ProcessOrder from "./OrderDetail/ProcessOrder";

const Admin = () => (
  <>
    <main className="flex">
      <Sidebar />
      <div className="ml-[20em] w-[80%]">
        <ProductList />
        {/* <ProcessOrder/> */}
      </div>
    </main>
  </>
);

export default Admin;
