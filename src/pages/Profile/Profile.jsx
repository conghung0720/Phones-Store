import React, {useState} from 'react'
import NavbarCol from '../../components/Navbar/NavbarCol'
import NavbarRow from '../../components/Navbar/NavbarRow'

function Profile() {
  
  return (
    <div class="flex">
      <div class="w-1/6">
        <NavbarCol/>
      </div>
      <div class="flex h-screen w-5/6 bg-zinc-800">
        <NavbarRow/>
        <div class="w-1/3 pt-16">
        <p class="p-7 text-white">
        <b>Personal Information</b><br/>
        Use a permanent address where you can receive mail.
        </p>
      </div>
      <div class=" w-2/3 pt-16 shadow-2xl scroll-m-1">
      <ul class="pl-36 pt-14 text-white">
        <div class="flex">
          <li class=" w-1/3">
            <img src="https://i.pinimg.com/236x/75/66/c2/7566c2f881e7ca9f2a5cedccbc9340f8.jpg" class="w-fit shadow-lg h-[8rem] rounded-xl"/>
          </li>
          <li class="w-2/2 mt-16">
            <button class="border w-[6rem] h-[2.5rem] shadow-md rounded-md hover:bg-gray-600" type='button'>Edit</button>
          </li>
        </div>
        <li class="mt-10">
          <p>Name</p>
          <input type="text" className='w-[30rem] h-[2rem] rounded-xl border bg-zinc-800'/>
        </li>
        <li class="mt-10">
        <p>User Name</p>
          <input type="text" className='w-[30rem] h-[2rem] rounded-xl border bg-zinc-800'/>
        </li>
        <li class="mt-10">
        <p>Email</p>
          <input type="text" className='w-[30rem] h-[2rem] rounded-xl border bg-zinc-800'/>
        </li>
        <li class="mt-10">
        <p>Pass</p>
          <input type="text" className='w-[30rem] h-[2rem] rounded-xl border bg-zinc-800'/>
        </li>
      </ul>
      </div>
      </div>
    </div>
  )
}

export default Profile