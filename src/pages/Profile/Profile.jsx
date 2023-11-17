import React, { useEffect, useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import Header from '../../components/Header/Header';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../api/api';
import { convertToBase64 } from '../Admin/Products/DialogProduct';

export default function Profile() {
  const { data: isData, isSuccess } = useGetProfileQuery();
  const [changeProfile] = useUpdateProfileMutation()
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({});

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Thực hiện lưu thông tin đã chỉnh sửa ở đây
    // Sau khi lưu, chuyển về chế độ xem
    await changeProfile(userData)
    setIsEditing(false);
  };

  const handleAvatarChange = async (e) => {
    const selectedFile = e.target.files[0];
    const base64Image = await convertToBase64(selectedFile);
    setUserData({ ...userData, avatar: base64Image, file: selectedFile });
  };

  useEffect(() => {
    if (isSuccess) {
      setUserData(isData);
    }
  }, [isData, isSuccess]);


  return (
    <>
      <Header />
      <div className="px-[20%] mt-[5%]">
        {
          isSuccess && (
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Thông tin cá nhân</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {isEditing ? "Bạn có quyền chỉnh sửa lại thông tin cá nhân." : "Thông tin cá nhân của bạn."}
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="userName" className="block text-sm font-medium leading-6 text-gray-900">
                        Tên tài khoản:{" "}
                        <span className="font-bold text-lg">
                          {userData.userName}
                        </span>
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="avatar" className="block text-sm font-medium leading-6 text-gray-900">
                        Ảnh đại diện
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <img
                          className="h-16 w-16 object-cover rounded-full"
                          src={isEditing && userData.file
                          ? URL.createObjectURL(userData.file)
                          : userData.avatar
                      }
                          alt="Current profile photo"
                        />
                        {isEditing ? (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Thông tin riêng tư</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Đây là thông tin giao hàng.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Họ và Tên
                      </label>
                      <div className="mt-2">
                        {isEditing ? (
                          <input
                            type="text"
                            autoComplete="name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={userData.fullName}
                            onChange={(e) =>
                              setUserData({ ...userData, fullName: e.target.value })
                            }
                          />
                        ) : (
                          `${userData.fullName || "Chưa cập nhật"}`
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email
                      </label>
                      <div className="mt-2">
                        {isEditing ? (
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                          />
                        ) : (
                          `${userData.email}`
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Tỉnh
                      </label>
                      <div className="mt-2">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          value={userData.country}
                          onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                        >
                          <option value="Tp.HCM">Tp.HCM</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                        Địa chỉ
                      </label>
                      <div className="mt-2">
                        {isEditing ? (
                          <input
                            type="text"
                            name="address"
                            id="address"
                            autoComplete="address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={userData.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                          />
                        ) : `${userData.address || "Chưa cập nhật"}`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">Thông báo</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Bạn có thể sẽ nhận được thông báo thông qua email.
                  </p>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                      <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                          <div className="flex h-6 items-center">
                            <input
                              id="receiveEmail"
                              name="receiveEmail"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                              checked={userData.receiveEmail}
                              onChange={(e) => setUserData({ ...userData, receiveEmail: e.target.checked })}
                            />
                          </div>
                          <div className="text-sm leading-6">
                            <label htmlFor="receiveEmail" className="font-medium text-gray-900">
                              Email
                            </label>
                            <p className="text-gray-500">Nhận thông báo đặt hàng thông qua email.</p>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                {isEditing ? (
                  <button
                    type="button"
                    onClick={handleSaveClick}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Lưu
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleEditClick}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {isEditing ? "Hủy" : "Chỉnh sửa"}
                  </button>
                )}
              </div>
            </form>
          )
        }
      </div>
    </>
  );
}

