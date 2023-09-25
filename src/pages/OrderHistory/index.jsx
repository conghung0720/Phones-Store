import React from 'react'
import Header from '../../components/Header/Header'
import { EllipsisHorizontalCircleIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'

const OrderHistory = () => {
  return (
    <>
    <Header/>
    <main className='bg-gray-100 py-[5%] px-[19%] min-h-screen'>
        <div className='bg-white rounded-t-lg'>
            <div className='flex justify-between border-b-2 py-[2%]'>
                <ul className='flex justify-around w-[50%]'>
                    <li>
                        <h1 className='font-medium tracking-tight text-gray-900'>Mã đơn hàng</h1>
                        <span className='text-gray-500'>#00000001</span>
                    </li>
                    <li>
                    <h1 className='font-medium tracking-tight text-gray-900'>Ngày đặt</h1>
                        <span>#00000001</span>
                    </li>
                    <li>
                    <h1 className='font-medium tracking-tight text-gray-900'>Tổng giá</h1>
                        <h4 className='font-medium'>#00000001</h4>
                    </li>
                </ul>
            <div className='w-[50%] relative'>
                <div className='absolute right-8 space-x-5'>
                <button className='border-[1.5px] bg-shadow p-3 rounded-lg'>Xem chi tiết</button>
                <button className='border-[1.5px] bg-shadow p-3 rounded-lg'>Xem hóa đơn</button>
                </div>
            </div>
            </div>
            <div className=' flex flex-wrap px-8 py-6'>
                <div className='flex h-[60%]'>
                    {/* image-item */}
                    <div className='w-[30%] h-[30%]'>
                    <img className='rounded-lg' src="https://tailwindui.com/img/ecommerce-images/order-history-page-03-product-01.jpg"/>
                    </div>
                    <div className='w-[70%] px-6 tracking-tight'>
                        <div className='mb-1.5 flex justify-between text-base'>
                            <h1 className='font-medium text-lg'>Iphone 15</h1>
                            <h1 className='font-bold'>3</h1>
                        </div>
                        <p>Màu đỏ</p>
                        <span className='text-gray-600 '>
                        Are you a minimalist looking for a compact carry option? The Micro Backpack is the perfect size for your essential everyday carry items. Wear it like a backpack or carry it like a satchel for all-day use
                        </span>
                    </div>
                </div>
                <div className='mt-5 w-full flex justify-between'>
                    {/* viewproduct */}
                    <div className='flex gap-3 text-gray-600 tracking-tight font-medium'>
                        <EllipsisHorizontalCircleIcon className='w-6 h-6 text-orange-600'/>
                        Đang kiểm tra
                    </div>
                    <div className='divide-x tracking-tight'>
                        <span className='px-5 cursor-pointer text-violet-700'>Xem sản phẩm</span>
                        <span className='pl-5 cursor-pointer text-violet-700'>Mua lại</span>
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}

export default OrderHistory