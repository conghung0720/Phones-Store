import React from 'react'
import Github from '../Icons/Github'
import  {Facebook}  from '../Icons/Facebook'
import { Discord}  from '../Icons/Discord'
import  {Twitter}  from '../Icons/Twitter'
const Footer=()=>{

  const List_FIRST = [
    {
      url: "https://flowbite.com/",
      title: "Thông tin"
    },
    {
      url: "#",
      title: "Giới thiệu"
    },
    {
      url: "#",
      title: "Phương thức thanh toán"
    },
    {
      url: "#",
      title: "Bảo hành và sửa chữa"
    },
    {
      url:"#",
      title: "Đánh giá chất lượng và khiếu nại"
    },
    {
      url: "#",
      title: "Tuyển dụng "
    }
  ]
  const LIST_SECOND =[
    {
      url: "#",
      title: "Thu cũ đổi mới"
    },
    {
      url: "#",
      title: "Giao hàng"
    }
    ,
    {
      url: "#",
      title: "Bảo hành "
    },
    {
      url: "#",
      title: "Giải quyết khiếu nại"
    },
    {
      url: "#",
      title: "Bảo mật thông tin"
    }
  ]

  //Hùng tạo xong cái list đầu tiên của footer r bh hùng làm cho xem nè ==ok


  return (
    //Header
    //hmm nhung maf haf hoi cais cho may cai anh tuwj chuyenr ddongj s nos kh chayj dc as 

    //mấy cái lặp đi lặp lại mà chỉ thay đổi có chút xíu như chữ á thì cho vào 1 mảng nha ==hùng làm thử đi hà xme okok
     <>
   <footer class="bg-gray-900 dark:bg-gray-900">
    <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 h-80">
        <div class="md:flex md:justify-between">
          <div class="mb-6 md:mb-0">
              <a href="https://flowbite.com/" class="flex items-center">
                  <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 mr-3" alt="FlowBite Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">BHHD</span>
              </a>
          </div>
          <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Thông tin và chính sách</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    {
                      LIST_SECOND.map(value => {
                        return (
                          <li>
                          <a href={value.url} class="hover:underline">{value.title}</a>
                          </li>   
                        )
                      })
                    }
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Chính sách</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                    {
                      List_FIRST.map(value=>{
                        return(
                        <li> 
                          <a href={value.url} class="hover:underline">{value.title}</a>
                        </li>
                        )
                      })
                    }
                  </ul>
              </div>
              <div>
                  <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase text-white">Địa chỉ liên hệ</h2>
                  <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="">
                          <a href="#" class="hover:underline">Đặt hàng</a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Hệ thống cửa hàng </a>
                      </li>
                      <li>
                          <a href="#" class="hover:underline">Liên hệ </a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div class="sm:flex sm:items-center sm:justify-between">
          <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <div class="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
              <a href="#" class="text-gray-500 hover:text-white dark:hover:text-white">
                <Facebook/>
              </a>
              <a href="#" class="text-gray-500 hover:text-white dark:hover:text-white">
                  <Discord/>
                  <span class="sr-only">Discord community</span>
              </a>
              <a href="#" class="text-gray-500 hover:text-white dark:hover:text-white">
                  <Twitter/>
                  <span class="sr-only">Twitter page</span>
              </a>   
              <a href="#" class="text-gray-500  hover:text-white">
                 <Github/>
                  <span class="sr-only">Dribbble account</span>
              </a>

          </div>
      </div>
    </div>
</footer>
      </>
       
  )

}
export default Footer