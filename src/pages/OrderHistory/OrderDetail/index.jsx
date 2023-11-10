import React, { useEffect, useState } from 'react'
import Header from '../../../components/Header/Header'
import { Button, Progress, Typography } from '@material-tailwind/react'
import { useParams } from 'react-router-dom'
import { useCancelOrderDetailMutation, useCommentProductMutation, useCompletedOrderDetailMutation, useGetOrderDetailByIdQuery } from '../../../api/api'
import { convertDate } from '../../../utils/convertDate'
import { formattedPrice } from '../../../utils/formatedPrice'

export default function OrderDetail() {
    const {orderId} = useParams()
    const {data: isData, isSuccess} = useGetOrderDetailByIdQuery(orderId);
    const [canceled] = useCancelOrderDetailMutation()
    const [completed] = useCompletedOrderDetailMutation()
    const [orderDetail, setOrderDetail] = useState()
    const [process, setProcess] = useState(1)

    useEffect(() => {
        const newOrder = isData?.filter(val => val._id === orderId)
       isSuccess && setOrderDetail(newOrder)

       if (isSuccess && newOrder.at(0).status === 1) {
        setProcess(100);
      } else if (isSuccess && newOrder.at(0).status === 2) {
        setProcess(70);
      } else if (isSuccess && newOrder.at(0).status === 4) {
        setProcess(40);
      } else if (isSuccess && newOrder.at(0).status === 5) {
        setProcess(10);
      } else if (isSuccess && newOrder.at(0).status === 6) {
        setProcess(0);
      }
    
    }, [])

    const handleCanceled = async () => {
      
    }
  return (
    <div>
        <Header/>
     {isSuccess && orderDetail?.map(val => <div className=' grid grid-cols-2 gap-1 py-4 m-auto w-[80%] mt-5'>
        <h1 className='font-bold text-xl'>Mã đơn hàng #{val._id.slice(1, 10)}</h1>
        <h2 className='justify-self-end'>Đặt hàng vào lúc {convertDate(val.createAt)} </h2>
        
        {val.products.map(pro => <div className='h-auto border flex flex-col-2 rounded-2xl col-span-2 p-10 gap-5 w-full '>
          <img src={pro.image} class="w-48 h-48 justify-center rounded-md" />

          <ul className=' w-[60%]'>
              <li className='font-medium'>{pro.name}</li>
              <li className='font-medium'>{formattedPrice(pro.price)}</li>
              <li className='font-medium'>x {pro.quantity}</li>
              <li className='text-gray-600 mt-2'>{pro.description}</li>
          </ul>

        <div className=' w-[20%] space-y-2'>
            <span className="font-bold m-auto">Địa chỉ nhận hàng</span>
            <p className='text-gray-700'>777 trường chinh, tây thạnh, tân phú</p>
        </div>
          <ul className='w-[30%] space-y-2'>
            <li className='font-bold'>Thông tin cụ thể</li>
            <li className='text-gray-700'>{val.email}</li>
            <li className='text-gray-700'>{val.phone_number}</li>
            <li>
            {/* <button type="button" class="text-white bg-blue-400 dark:bg-blue-500 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center" disabled>Edit</button> */}
            </li>
          </ul>
        </div>)}

        
      </div>) }
    {/* ------------------------------------- */}
    <div className='col-span-2  w-[90%] m-auto p-5'>
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          Đang kiểm tra
        </Typography>
        <Typography color="blue-gray" variant="h6">
          Đã xác nhận
        </Typography>
        <Typography color="blue-gray" variant="h6">
          Đang giao
        </Typography>
        <Typography color="blue-gray" variant="h6">
          Hoàn thành
        </Typography>
      </div>
      {/* 10-40-70-100 */}
      <Progress color='blue' value={process} />

    </div>
    <div className='mb-[5%] relative'>
    {isSuccess && orderDetail?.at(0).status !== 1 && orderDetail?.at(0).status !== 6 &&
    <button onClick={async () => await canceled({_id: orderId})} color='red' className='m-auto bg-red-600 rounded-lg text-white p-4 absolute right-[50%]'>
        Hủy đơn hàng</button>}
        {isSuccess && orderDetail?.at(0).status !== 1 && orderDetail?.at(0).status === 2 &&
    <button onClick={async () => await completed({_id: orderId})} color='red' className='m-auto bg-blue-600 rounded-lg text-white p-4 absolute right-[40%]'>
        Hoàn thành</button>}
    </div>
    </div>
  )
}