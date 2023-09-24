import React from "react";
import Header from "../../components/Header/Header";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import CartItems from "./CartItems";


const Cart = () => {
  return (
    <>
      <Header />
      <div className=" py-[5%] flex justify-between px-[3%]">
        <div className="block">
        {/* <h1 className="text-[30px] font-bold">Giỏ hàng</h1> */}
        </div>
        <div className="w-[60%] py-10">
          <CartItems/>
        </div>

        <div className="w-[30%] h-[390px] bg-slate-50 rounded-lg p-5">
          <div className="">
            <div className="text-[22px] mb-3">Hóa đơn</div>
            <ul className="divide-y divide-solid text-slate-500">
              <li className="py-2 flex justify-between">
                <span>Tổng giá</span>
                <span className="text-black">322.000 VND</span>
              </li>
              <li className="py-2 flex justify-between">
                <span>Tiền ship</span>
                <span className="text-black">25.000 VND</span></li>
                <li className="py-2 flex justify-between">
                <span>Tiền thuế</span>
                <span className="text-black">25.000 VND</span></li>
                <li className="py-2 flex justify-between">
                <span className="text-black font-semibold text-[20px]">Tổng giá</span>
                <span className="text-black text-[20px]">25.000 VND</span></li>         
              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Thanh toán
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
