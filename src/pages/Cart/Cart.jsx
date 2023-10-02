import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import CartItems from "./CartItems";
import { store } from "../../store";
import { incremented } from "../../store/redux/userSlice";
import { useRegisterMutation, useGetCartQuery } from "../../api/api";
import { Link } from "react-router-dom";
import { formattedPrice } from "../../utils/formatedPrice";
import ErrorTeamplate from "../../components/ErrorTemplate/ErrorTemplate";


const Cart = () => {
  const [changeQuantity, setChangeQuantity] = useState();
  const [loadingCartItem, setLoadingCart] = useState();
  const [totalPrice, setTotalPrice] = useState(0);


  const {userInfo} = store.getState().reducer;
  
  const {data: isData, isSuccess, isLoading} = useGetCartQuery({userId: userInfo?._id})



  useEffect(() => {
    if(isSuccess){
      setLoadingCart(isData)
      
    }
  }, [isData, isLoading, isSuccess])
  
  return (
    <>
      <Header />
      {loadingCartItem?.items_cart.length > 0 ? 
     <div className=" py-[5%] flex justify-between px-[3%]">
        <div className="block">
        {/* <h1 className="text-[30px] font-bold">Giỏ hàng</h1> */}
        </div>
        <div className="w-[60%] py-10">
          { loadingCartItem ? loadingCartItem.items_cart.map(value =>
           <CartItems productId={value.productId} loadingCartItem={setLoadingCart} attrId={value.id} handleChangeValue={() => setChangeQuantity} quantity={value.quantity} name={value.name} color={value.color} price={value.price} image={value.image} />) 
          : <div></div>}
        </div>

        <div className="w-[30%] h-[390px] bg-slate-50 rounded-lg p-5">
          <div className="">
            <div className="text-[22px] mb-3">Hóa đơn</div>
            <ul className="divide-y divide-solid text-slate-500">
              <li className="py-2 flex justify-between">
                <span>Tổng giá</span>
                <span className="text-black">{loadingCartItem && formattedPrice(loadingCartItem.total_price_cart)}</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Tiền ship</span>
                <span className="text-black">25.000 VND</span></li>
                <li className="py-2 flex justify-between">
                <span>Tiền thuế</span>
                <span className="text-black">25.000 VND</span></li>
                <li className="py-2 flex justify-between">
                <span className="text-black font-semibold text-[20px]">Tổng giá</span>
                <span className="text-black text-[20px]">{loadingCartItem && formattedPrice(loadingCartItem?.total_price_cart + 25000 + 25000)}</span></li>    
                <Link to="/checkout">
                  <button
                    type="submit"
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                    Thanh toán
                  </button>
                  </Link>     
            </ul>
          </div>
        </div>
      </div> 
      : <ErrorTeamplate link={"/productlist"} title={"Giỏ hàng trống"} description="Hiện tại giỏ hàng của bạn đang trống!" button_1="Xem sản phẩm" button_2="f"></ErrorTeamplate>}
    </>
  );
};

export default Cart;
