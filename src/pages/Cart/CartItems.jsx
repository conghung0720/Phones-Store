import React from 'react'
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";


const product = {
    name: "Basic Tee 6-Pack",
    price: "$192",
    href: "#",
    breadcrumbs: [
      { id: 1, name: "Men", href: "#" },
      { id: 2, name: "Clothing", href: "#" },
    ],
    images: [
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
        alt: "Two each of gray, white, and black shirts laying flat.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
        alt: "Model wearing plain black basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
        alt: "Model wearing plain gray basic tee.",
      },
      {
        src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
        alt: "Model wearing plain white basic tee.",
      },
    ],
    colors: [
      {
        name: "White",
        class: "bg-white",
        selectedClass: "ring-gray-400",
        inStock: false,
      },
      {
        name: "Gray",
        class: "bg-gray-200",
        selectedClass: "ring-gray-400",
        inStock: true,
      },
      {
        name: "Black",
        class: "bg-gray-900",
        selectedClass: "ring-gray-900",
        inStock: true,
      },
    ],
    sizes: [
      { name: "XXS", inStock: false },
      { name: "XS", inStock: true },
      { name: "S", inStock: true },
      { name: "M", inStock: true },
      { name: "L", inStock: true },
      { name: "XL", inStock: true },
      { name: "2XL", inStock: true },
      { name: "3XL", inStock: true },
    ],
    description:
      'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
      "Hand cut and sewn locally",
      "Dyed with our proprietary colors",
      "Pre-washed & pre-shrunk",
      "Ultra-soft 100% cotton",
    ],
    details:
      'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
  

const CartItems = () => {
  return (
    <ul>
    <li className=" h-[20em] py-7 flex border-y-[1.5px]">
      <img className="h-full w-[40%] object-cover" src={product.images[0].src}/>
      <div className="w-full flex px-3">
        <div className="w-[50%] h-full space-y-1.5 relative">
        <h2 className="text-slate-700 font-semibold">Iphone 15</h2>
        <h4 className="text-slate-̉500">Màu: Đỏ</h4>
        <h1 className="font-semibold">350.500 VND</h1>
        <span className="flex absolute bottom-0 left-0">
        <CheckIcon className="h-5 w-5 text-green-600"/>
        Còn hàng
        </span>
        </div>
        <div className="w-[50%] h-[15%] flex justify-between items-center">
          <select className="focus:outline-blue-500 active:outline-blue-500 py-1 border-[1.5px] rounded-[5px] px-4">
            <option>3</option>
          </select>
          <XMarkIcon className="h-5 w-5 text-slate-500 cursor-pointer hover:text-slate-800"/>
        </div>
      </div>
    </li>
   
  </ul>
  )
}

export default CartItems