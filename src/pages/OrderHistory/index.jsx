import React from "react";
import Header from "../../components/Header/Header";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/20/solid";
import { store } from "../../store";
import { useGetOrderHistoryUserQuery } from "../../api/api";
import { formattedPrice } from "../../utils/formatedPrice";
import { convertDate } from "../../utils/convertDate";

const OrderHistory = () => {
  const { userInfo } = store.getState().reducer;
  const { data: isData, isSuccess } = useGetOrderHistoryUserQuery();
  return (
    <>
      <Header />
      <main className="bg-gray-100 space-y-9 py-[5%] px-[19%] min-h-screen">
        {isSuccess &&
          isData?.map((value) => (
            <div className="bg-white rounded-t-lg">
              <div className="flex justify-between border-b-2 py-[2%]">
                <ul className="flex justify-around w-[50%]">
                  <li>
                    <h1 className="font-medium tracking-tight text-gray-900">
                      Mã đơn hàng
                    </h1>
                    <span className="text-gray-500">
                      #{value._id.slice(0, 13)}
                    </span>
                  </li>
                  <li>
                    <h1 className="font-medium tracking-tight text-gray-900">
                      Ngày đặt
                    </h1>
                    <span>{convertDate(value.createAt)}</span>
                  </li>
                  <li>
                    <h1 className="font-medium tracking-tight text-gray-900">
                      Tổng giá
                    </h1>
                    <h4 className="font-medium">
                      {formattedPrice(value.total_price + 25000 + 25000)}
                    </h4>
                  </li>
                </ul>
                <div className="w-[50%] relative">
                  <div className="absolute right-8 space-x-5">
                    <button className="border-[1.5px] bg-shadow p-3 rounded-lg">
                      Xem chi tiết
                    </button>
                    <button className="border-[1.5px] bg-shadow p-3 rounded-lg">
                      Xem hóa đơn
                    </button>
                  </div>
                </div>
              </div>
              {value.products.map((value) => (
                <div className="border-b-2 flex flex-wrap px-8 py-6">
                  <div className="flex h-[60%]">
                    {/* image-item */}
                    <div className="w-[30%] h-[30%]">
                      <img className="rounded-lg" src={value.image} />
                    </div>
                    <div className="w-[70%] px-6 tracking-tight">
                      <div className="mb-1.5 flex justify-between text-base">
                        <h1 className="font-medium text-lg">{value.name}</h1>
                        <h1 className="font-bold">{value.quantity}</h1>
                      </div>
                      <p>Màu {value.color}</p>
                      <span className="text-gray-600 ">
                        {value.description}
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 w-full flex justify-between">
                    {/* viewproduct */}
                    <div className="flex gap-3 text-gray-600 tracking-tight font-medium">
                      <EllipsisHorizontalCircleIcon className="w-6 h-6 text-orange-600" />
                      Đang kiểm tra
                    </div>
                    <div className="divide-x tracking-tight">
                      <span className="px-5 cursor-pointer text-violet-700">
                        Xem sản phẩm
                      </span>
                      <span className="pl-5 cursor-pointer text-violet-700">
                        Mua lại
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </main>
    </>
  );
};

export default OrderHistory;
