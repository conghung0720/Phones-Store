import React, { useEffect, useState } from "react";
import { useDeleteProductMutation, useGetListPhonesQuery } from "../../../../api/api";
import { Button } from "@material-tailwind/react";
import AddProduct from "../AddProduct";
import DialogProduct from "../DialogProduct";
import CalloutRadix from "../../../../components/Form/Callout";



function formatPrice(price) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

const ProductList = () => {
  const MAX_NAME_LENGTH = 20;
  const [deleteProduct] = useDeleteProductMutation();
  const [isCallout, setCallout] = useState(false);
  const [calloutError, setCallOutError] = useState('');
  // const d = useQuery

  const {data: isData, isSuccess, isFetching, isLoading} = useGetListPhonesQuery()
  const [openEdit, setOpenEdit] = useState(false);

  const formatProductName = (name) => {
    if (name.length > MAX_NAME_LENGTH) {
      return name.slice(0, MAX_NAME_LENGTH) + '...';
    }
    return name;
  };

  const handleEdit = () => {
    setOpenEdit(true)
  }

  const handleDeleteProduct = async (productId) => {
    await deleteProduct({_id: productId}).then(res => {
      setCallout(true)
      setCallOutError('Xóa thành công')
      setInterval(() => setCallout(false), 5000)
    })
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold text-gray-800">Danh sách sản phẩm</h2>
       
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-64 py-2 px-3 border border-gray-300 rounded-l-lg"
            />
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-lg">
              Tìm
            </button>
          </div>
          <div className="flex space-x-4">
          <AddProduct/>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Xuất Excel
          </button>
        </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y bg-slate-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-bold text-gray-600">ID</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Ảnh</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Tên</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Thương hiệu</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Giá</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Số lượng</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Đã bán</th>
              <th className="px-6 py-3 text-left font-bold text-gray-600">Thao tác</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y">
            {isSuccess && isData.map((product, index) => (
              <tr key={product._id} className="hover:bg-slate-200">
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className="px-6 py-4">{formatProductName(product.name)}</td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{formatPrice(product.attributes?.at(0).price)}</td>
                <td className="px-6 py-4 font-bold">{product.attributes?.map(value => value.quantity).reduce((preVal, currentVal) => currentVal + preVal)}</td>
                <td className="px-6 py-4 font-bold">{product.quantity_sold}</td>
                <td className="px-6 py-4">
                  {/* <Button  value={product._id} onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mr-2">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="#000000"></path> </g></svg>
                    Sửa
                  </Button> */}
                  <AddProduct editProduct={product._id}/>
                  <Button onClick={() => handleDeleteProduct(product._id)} className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-4 rounded">
                    Xóa
                    <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#231815"></path><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#231815"></path></g></svg>                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isCallout && <CalloutRadix text={calloutError}/>}
    </div>
  );
};

export default ProductList;
