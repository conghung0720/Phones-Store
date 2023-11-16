import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  DocumentDownloadIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import {
  useCancelOrderDetailMutation,
  useDeliveringOrderDetailMutation,
  useGetOrderHistoryUserQuery,
  useGettingItemOrderDetailMutation,
} from "../../../api/api";
import axios from "axios";
import { PROCESS_STATUS } from "../../../constants";
import { convertDate } from "../../../utils/convertDate";

const OrderStatus = (status) => {
  let colorClass = "";
  let text = "";
  switch (status) {
    case PROCESS_STATUS.COMPLETED.CODE:
      colorClass = "bg-blue-500";
      text = PROCESS_STATUS.COMPLETED;
      break;
    case PROCESS_STATUS.DELIVERING.CODE:
      colorClass = "bg-green-500";
      text = PROCESS_STATUS.DELIVERING.DISPLAY;
      break;
    case PROCESS_STATUS.IN_PROGRESS.CODE:
      colorClass = "bg-yellow-500";
      text = PROCESS_STATUS.IN_PROGRESS.DISPLAY;
      break;
    case PROCESS_STATUS.GETTING_ITEM.CODE:
      colorClass = "bg-orange-500";
      text = PROCESS_STATUS.GETTING_ITEM.DISPLAY;
      break;
    case PROCESS_STATUS.CANCELED.CODE:
      colorClass = "bg-red-500";
      text = PROCESS_STATUS.CANCELED.DISPLAY;
      break;
    default:
      colorClass = "bg-gray-500";
      text = "Lỗi";
      break;
  }

  return (
    <div
      className={`${colorClass} text-white text-[16px] py-1 px-2 rounded-lg inline-block`}
    >
      {text}
    </div>
  );
};

function ProcessOrder() {
  const [activeTab, setActiveTab] = useState(PROCESS_STATUS.COMPLETED.CODE);
  const [isDataOrder, setIsDataOrder] = useState([]);
  const [dataExports, setDataExports] = useState([]);
  const { data: dataOrder, isSuccess } = useGetOrderHistoryUserQuery();
  const [cancelOrder] = useCancelOrderDetailMutation();
  const [delivering] = useDeliveringOrderDetailMutation();
  const [gettingItem] = useGettingItemOrderDetailMutation();

  const handleDelivery = async (id) => {
    await delivering({ _id: id });
  };

  const handleCancel = async (id) => {
    await cancelOrder({ _id: id });
  };

  const handleAccept = async (id) => {
    await gettingItem({ _id: id });
  };

  useEffect(() => {
    setIsDataOrder(dataOrder);
    const dataUpdate = dataOrder
      ?.map((value) => {
        if (value.status === "Đã nhận") {
          return {
            "Ngày nhận": value.updateAt,
            "Tổng giá": value.fullPrice.toFixed(3),
          };
        } else return;
      })
      .filter((value) => value !== undefined);

    setDataExports(dataUpdate);
  }, [dataOrder]);
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          {/* <MenuIcon className="w-6 h-6 text-gray-600" /> */}
          <span className="text-xl font-bold text-gray-800">Dashboard</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* <SearchIcon className="w-6 h-6 text-gray-600" /> */}
          <input
            type="text"
            placeholder="Search invoice"
            className="w-40 border-b border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {/* <ExportExcel data={dataExports} /> */}
        </div>
      </div>
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Tiến trình sản phẩm
        </h1>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={() => setActiveTab("Tất cả")}
            className={`px-4 py-2 rounded-md ${
              activeTab === "Tất cả"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.COMPLETED.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.COMPLETED.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.COMPLETED.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.DELIVERING.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.DELIVERING.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.DELIVERING.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.GETTING_ITEM.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.GETTING_ITEM.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {PROCESS_STATUS.GETTING_ITEM.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.IN_PROGRESS.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.IN_PROGRESS.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {/* Đang xử lý */}
            {PROCESS_STATUS.IN_PROGRESS.DISPLAY}
          </button>
          <button
            onClick={() => setActiveTab(PROCESS_STATUS.CANCELED.CODE)}
            className={`px-4 py-2 rounded-md ${
              activeTab === PROCESS_STATUS.CANCELED.CODE
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Đã Hủy
          </button>
        </div>
        <table className="mt-4 w-full bg-white shadow-sm rounded-md">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Số thứ tự
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tên khách
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Sản phẩm
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Ngày đặt
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Tổng giá
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Trạng thái
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {isSuccess &&
              dataOrder?.length > 0 &&
              [...dataOrder]
                .filter((order) => {
                  if (activeTab === "Tất cả") return order;
                  if (activeTab === order.status) return order;
                })
                ?.reverse()
                .map((order, index) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {isDataOrder.length - index}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {order.full_name}
                    </td>
                    <Link to={`/history-orders/${order._id}`}>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600 cursor-pointer">
                        Chi tiết
                      </td>
                    </Link>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {convertDate(order.createAt)}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">
                      {order.total_price?.toFixed(3)} VND
                    </td>
                    <td>{OrderStatus(order?.status)}</td>
                    <td className="px-4 py-3 flex items-center justify-end">
                      {order?.status === PROCESS_STATUS.IN_PROGRESS.CODE && (
                        <>
                          <button
                            onClick={() => handleAccept(order._id)}
                            className="px-2 py-1 mr-3 bg-gray-200 rounded-md text-gray-600 hover:bg-gray-300"
                          >
                            Chấp nhận
                          </button>

                          <button
                            onClick={() => handleCancel(order._id)}
                            className="px-2 py-1 bg-rose-600 rounded-md text-white hover:bg-rose-500"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                      {order?.status === PROCESS_STATUS.GETTING_ITEM.CODE && (
                        <>
                          <button
                            onClick={() => handleDelivery(order._id)}
                            className="px-2 py-1 mr-3 bg-yellow-200 rounded-md text-gray-600 hover:bg-yellow-300"
                          >
                            Giao hàng
                          </button>
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="px-2 py-1 bg-rose-600 rounded-md text-white hover:bg-rose-500"
                          >
                            Hủy
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between space-x-4">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            Previous
          </button>
          <span className="text-sm font-medium text-gray-800">
            Page 1 of 10
          </span>
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProcessOrder;
