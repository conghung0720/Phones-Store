import React, { useState } from 'react'
import Sidebar from './Sidebar'
import AddProduct from './Products/AddProduct'
import ProductList from './Products/ProductList'
import ProcessOrder from './OrderDetail/ProcessOrder'
import { UserList } from './Users'


const Admin = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(1);

  const handleMenuItemClick = (value) => {
    setSelectedMenuItem(value);
  };

  return (
    <>
      <main className='flex'>
        <Sidebar selectedMenuItem={selectedMenuItem} handleMenuItemClick={handleMenuItemClick} />
        <div className='ml-[20em] w-[80%]'>
          {/* Hiển thị nội dung tương ứng với mục được chọn */}
          {selectedMenuItem === 1 && <UserList />}
          {selectedMenuItem === 2 && <ProcessOrder />}
          {selectedMenuItem === 3 && <ProductList />}
          {/* Thêm các trang hoặc nội dung khác ở đây */}
        </div>
      </main>
    </>
  );
};


export default Admin