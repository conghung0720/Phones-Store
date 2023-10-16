import React, { useState } from 'react'
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useAddToCartMutation, useFindCartByUserIdMutation, useGetProductSubByIdMutation, useRegisterMutation, useUpdateItemMutation } from "../../api/api";
import { formattedPrice } from '../../utils/formatedPrice';
import { store } from '../../store';
import { ToastContainer, toast } from 'react-toastify';


const CartItems = ({name, color, price, image, quantity, loadingCartItem, productId, attrId, key}) => {
  const [updateItem, result] = useUpdateItemMutation()
  const [findSubProduct, {loading}] = useGetProductSubByIdMutation()
  const {userInfo} = store.getState().reducer;



  // console.log(quantity);
  const [priceItem, setPriceItem] = useState("");

  const handleChangeValue = (e) => {
      // console.log(e.target);
  }


  const handleSubtract = async () => {
    const {_id: userId} = userInfo;
    const {data} = await findSubProduct({
      productId,
      attrId,
    })



    await updateItem({
      productId,
      userId,
      id: attrId,
      quantity: -1,
      price: -data.price,
      old_quantity: +quantity
    })
  }
  
  const handlePlus = async () => {
    const {_id: userId} = userInfo;
    const {data} = await findSubProduct({
      productId,
      attrId,
    })

    if(data.quantity <= quantity) return alert(`Vượt quá hàng tồn kho`)

      


    await updateItem({
      productId,
      userId,
      id: attrId,
      quantity: +1,
      price: data.price,
      old_quantity: +quantity
    })
  }
  
  return (
      <>
    <ul>
    <li key={key} className=" h-[20em] py-7 flex border-y-[1.5px]">
      <img className="h-full w-[15em] object-cover" src={image}/>
      <div className="w-full flex px-3 ">
        <div className="w-[50%] h-full space-y-1.5 relative">
        <h2 className="text-slate-700 font-semibold">{name}</h2>
        <h4 className="text-slate-̉500">Màu: {color}</h4>
        <h1 className="font-semibold">{formattedPrice(price)}</h1>
        <span className="flex absolute bottom-0 left-0">
        <CheckIcon className="h-5 w-5 text-green-600"/>
        Còn hàng
        </span>
        </div>
        <div className="w-[50%] h-[15%] flex justify-between items-center">
          <div class="custom-number-input h-10 w-32">
            <label for="custom-input-number" className="w-full ml-9 text-gray-700 text-sm font-semibold">Số lượng
            </label>
            <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
              <button onClick={handleSubtract} data-action="decrement" className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none">
                <span class="m-auto text-2xl font-thin">−</span>
              </button>
              <input type="number" onChange={handleChangeValue} value={quantity} className="focus:outline-none text-center w-full bg-white font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number"></input>
            <button onClick={handlePlus} data-action="increment" className="bg-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
              <span class="m-auto text-2xl font-thin">+</span>
            </button>
            </div>
          </div>
         <XMarkIcon className="h-5 w-5 text-slate-500 cursor-pointer hover:text-slate-800"/>
        </div>
      </div>
    </li>
  </ul>
  </>
  )
}

export default CartItems