import React from 'react'
import { Search } from '../../../components/Icons/Search'

export const UserList = () => {
  const LIST_USER =[
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYF0-4qC_0TdJgja__H7DtTLJtyfr_gyD3GA&usqp=CAU",
      name:"Tuyết Hà",
      email:"ha@gmail.com",
      position:"Customer",
      status:"Onlile",
      
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYF0-4qC_0TdJgja__H7DtTLJtyfr_gyD3GA&usqp=CAU",
      name:"Tuyết Hà",
      email:"ha@gmail.com",
      position:"Customer",
      status:"Onlile",
      
    },
    {
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYF0-4qC_0TdJgja__H7DtTLJtyfr_gyD3GA&usqp=CAU",
      name:"Tuyết Hà",
      email:"ha@gmail.com",
      position:"Customer",
      status:"Onlile",
      
    }
      ]
      const LIST_NUMBER=[
        {
          title:"Number of deloys",
          number:"405"
        },
        {
          title:"Average deploy time",
          number:"3.65"
        },
        {
          title:"ANumber of servers",
          number:"3"
        },
        {
          title:"Success rate",
          number:"98.5%"
        }
      ]
  return (
    <div class=" h-screen text-white  ">
  
        

    <div class="w-full text-sm text-left  dark:text-black bg-center  mt-8 ">
        
        <div class="grid grid-cols-4 ">
          {
            LIST_NUMBER.map(value=>{return(
            <div class="text-center p-8 border-r-2 border-gray-900 ">
                <h2 class="text-xl font-medium ">{value.title}</h2>
                <h3 class="  font-semibold text-4xl  "> {value.number}</h3>
            </div>
            )})
          }
            
        </div>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-12 ">
    {/* <div class="flex items-center justify-between pb-4 bg-white dark:bg-gray-900 ">
        
        <label for="table-search" class="sr-only mt-3">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-center">
                <Search/>
            </div>
            <input type="text" id="table-search-users" class="inline-block  p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
        </div>
    </div> */}
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Position
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {
                LIST_USER.map(item=>{ return( 
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <img class="w-10 h-10 rounded-full" src={item.img} alt="Jese image"/>
                    <div class="pl-3">
                        <div class="text-base font-semibold">{item.name}</div>
                        <div class="font-normal text-gray-500">{item.email}</div>
                    </div>  
                </th>
                 
                <td class="px-6 py-4">
                  {item.position}
                </td>
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <div class="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>{item.status}
                    </div>
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                </td>
               
            </tr>
            )})
          }
          
            </tbody>
    </table>
</div>

    </div>
</div>
  )
}
