import React from "react";
import { FAKE_DATA_PHONES } from "../../api/FakeData/DataPhones";
// import { Start } from "../../components/Icons/Start";
// import { Tym } from "../../components/Icons/Tym";


const Product = () => {
  return(
    <div className="container mx-auto min-4 min-h-screen ">
  <div className="grid grid-cols-4 grid-flow-row gap-4 mt-10 "> 
  {
    FAKE_DATA_PHONES.map(value => {
      return (
        <div className="w-64 h-[28rem] rounded-2xl shadow-2xl px-2.5 relative   " key={value._id}>
        <div className="ml-8">
        <img className="text-center object-cover"  width="160" height="160" src={value.image}  ></img>
        </div> 
        <h3 className="font-semibold text-base font-sans h-20 mt-2 "> {value.name}</h3>
        <div  >
        <p className="text-xs" > {value.storageOptions.map(storage => {
        return( <div className="border-solid border-2 rounded-md py-px px-1.5 my-2 inline-block mr-3 " key={storage}>{storage}</div>)})} </p>
    </div>
       <div className="text-base mt-2 "> 
      <h2 >Giá ưu đãi: <p className="text-red-500 inline-block text-lg font-semibold">{value.price}</p></h2>
        </div>
      <div  >
        <p className="text-xs" > {value.colors.map(color => {
        return( <div className="border-solid border-2 rounded-md py-px px-1.5 my-2 inline-block mr-3 " key={color}>{color}</div>)})} </p>
    </div>
    <div >
      <Start/>
      <Start/>
      <Start/>
      <Start/>
      <Start/>
    </div>
    <div className=" flex justify-end mt-6"> 
      <h2  className="text-red-500">Yêu thích </h2> 
      <Tym/>
    </div>
    </div>
      )
    })
  }

   </div>
</div>
  )
};

export default Product;