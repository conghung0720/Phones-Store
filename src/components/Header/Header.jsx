import React from 'react'
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Typography,
  } from "@material-tailwind/react";
import Search from '../Search/Search';

  const BRAND_DATA = [
    {
      _id: "1",
      name: "Apple",
      country: "Mỹ",
      logo: "https://cdn-icons-png.flaticon.com/128/2504/2504884.png",
    },
    {
      _id: "2",
      name: "Samsung",
      country: "Hàn Quốc",
      logo: "https://cdn-icons-png.flaticon.com/128/5969/5969247.png",
    },
    {
      _id: "3",
      name: "Google",
      country: "Mỹ",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/800px-Google_Chrome_icon_%28February_2022%29.svg.png",
    },
    {
      _id: "4",
      name: "Xiaomi",
      country: "Trung Quốc",
      logo: "https://th.bing.com/th/id/OIP.2fGI5f8n-w8UKf2VhpKpKgFNC7?pid=ImgDet&rs=1",
    },
    {
      _id: "5",
      name: "OPPO",
      country: "Trung Quốc",
      logo: "https://th.bing.com/th/id/R.3a2a81d8f809c9a0fba7bf8ed5e73cb2?rik=bcm%2ffQdHFJgqkQ&pid=ImgRaw&r=0",
    },
    {
      _id: "6",
      name: "Vivo",
      country: "Trung Quốc",
      logo: "https://th.bing.com/th/id/OIP.r02YiDFZMmo6wq7hDBI7mQHaEK?pid=ImgDet&rs=1",
    },
  ];
  
  
  export function MenuCustomList() {
    const [openMenu, setOpenMenu] = React.useState(false);
   
    return (
      <Menu open={openMenu} handler={setOpenMenu} allowHover>
        <MenuHandler>
          <Button
            variant="text"
            className="flex items-center gap-3 text-base font-normal capitalize tracking-normal">
            <div class="flex relative ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
                </svg>
            </div> {" "} 
          </Button>
        </MenuHandler>
        <MenuList className="hidden w-[10rem] grid-cols-7 overflow-visible lg:grid">
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {BRAND_DATA.map(({ name, logo }) => (
              <a href="#" key={name}>
                <MenuItem>
                <p class="flex relative hover:text-blue-600">
                    <img src={logo} class="w-7 h-7 mr-4"/>
                    <Typography variant="h6" color="blue-gray" className="mb-1" class="flex">
                        {name}
                    </Typography>
                </p>
                </MenuItem>
              </a>
            ))}
          </ul>
        </MenuList>
      </Menu>
    );
  } 

const Header = () => {
  return (
    <header class="bg-rose-600 text-white py-4 shadow-lg shadow-rose-300  relative flex ">
        <div class="container mx-auto relative  ">
            <div class="flex relative space-x-6 ">
            <a href="#" class="text-xl font-semibold mx-10 ">Logo</a>
                <nav class="relative">
                    <ul class="flex relative space-x-3 ml-2 mt-1 text-lg">
                        <li><a href="#" class="hover:text-gray-400">Home</a></li>
                        <li><a href="#" class="hover:text-gray-400">About</a></li>
                        <li><a href="#" class="hover:text-gray-400">Services</a></li>
                    </ul>
                </nav>
                <MenuCustomList/>
                <Search/>  
            </div>
            
        </div>
        <div className="justify-end flex relative mr-10">
          <a href="#" class="text-white hover:text-blue-600 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </a>
          <a href="#" class="text-gray-400 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span class="bg-cyan-500 text-white rounded-full px-2 py-1 text-xs absolute -top-2 -right-4">3</span>
          </a>
        </div> 
    </header>
  )
}

export default Header