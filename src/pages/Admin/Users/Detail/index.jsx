import { UserCircleIcon } from '@heroicons/react/20/solid';
import { Input } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useGetUserByIdQuery, useUpdateProfileMutation } from '../../../../api/api';

export default function UserDetailAdmin({ userId }) {
  const { data: isData, isSuccess, isLoading } = useGetUserByIdQuery(userId);
  const [changeProfile] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(isData);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log(userData);
    try {
      const response = await changeProfile(userData);
      console.log(response.data);
      setIsEditing(false);
    } catch (error) {
      // Handle any errors that may occur during the save operation.
      console.error('Error saving the user profile:', error);
    }
  };

  const handleChange = (e, field) => {
    const value = e.target.value;
    setUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setSelectedAvatar(file);
  };

  useEffect(() => {
    if (isSuccess) {
      setUserData(isData);
    }
  }, [isSuccess, isData]);

  return (
    <div>
      {isSuccess && userData && (
        <div className="px-4 sm:px-0">
          <div className="col-span-full">
            <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
              Ảnh đại diện
            </label>
            <div className="mt-2 flex items-center gap-x-3">
              <img src={userData?.avatar} className="w-12 h-12" alt="Avatar" />
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Họ tên</dt>
                {isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      className="rounded-lg"
                      type="text"
                      value={userData.fullName}
                      onChange={(e) => handleChange(e, 'fullName')}
                    />
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.fullName}</dd>
                )}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tên tài khoản</dt>
                <dd className="mt-1 text-sm leading-6 text-red-700 font-bold sm:col-span-2 sm:mt-0">
                  {userData.userName}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Quyền</dt>
                {isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <select
                      className="rounded-lg"
                      value={userData.role}
                      onChange={(e) => handleChange(e, 'role')}
                    >
                      <option className="text-red-600" value="Admin">
                        Admin
                      </option>
                      <option value="User">User</option>
                    </select>
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm leading-6 font-bold text-green-600 sm:col-span-2 sm:mt-0">
                    {userData.role}
                  </dd>
                )}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                {isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      value={userData.email}
                      onChange={(e) => handleChange(e, 'email')}
                    />
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userData.email}
                  </dd>
                )}
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Địa chỉ</dt>
                {isEditing ? (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <input
                      type="text"
                      value={userData.address}
                      onChange={(e) => handleChange(e, 'address')}
                    />
                  </dd>
                ) : (
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {userData.address}
                  </dd>
                )}
              </div>
            </dl>
            {isEditing ? (
              <div className="px-4 py-6 relative">
                <button
                  type="button"
                  className="bg-green-500 right-5 absolute text-white px-4 py-2 rounded-md"
                  onClick={handleSave}
                >
                  Lưu
                </button>
              </div>
            ) : (
              <div className="px-4 py-6 relative">
                <button
                  type="button"
                  className="bg-blue-500 right-5 absolute text-white px-4 py-2 rounded-md"
                  onClick={handleEdit}
                >
                  Chỉnh sửa
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
