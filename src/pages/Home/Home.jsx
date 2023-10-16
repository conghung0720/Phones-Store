
import IP15 from '../../Public/oppo-reno10.jpg'
import JFOD5 from '../../Public/samsung_galax-jfold5y.jpg'



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Slides from '../../components/Slides/Slides';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import BannerHead from '../../components/Banner/BannerHead';
import NewProduct from './NewProducts';
import { Link } from 'react-router-dom';
import HeaderSection from './Section';
import NewsLetter from './Section/NewsLetter';


const IMAGES_BANNER = [
  {
    id: 1,
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/Sliding%20(9).png"
  },
  {
    id: 2,
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/xiaomi-redmi-12-series-sliding-th99.jpg"
  },
  {
    id: 3,
    image: "https://cdn2.cellphones.com.vn/690x300,webp,q100/https://dashboard.cellphones.com.vn/storage/sliding-realme%2011-009.jpg"
  },
  {
    id: 4,
    image: IP15
  }
]

export default function Home() 
{
    return (
        <>
        <Header/>
        <BannerHead/>
      <div className="relative overflow-hidden bg-white">
        <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
            <div className="sm:max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Đặt ngay điện thoại tại shop
              </h1>
              <p className="mt-4 text-xl text-gray-500">
              Chúng tôi cam kết không chỉ mang đến cho bạn những chiếc điện thoại giá rẻ, mà còn đảm bảo chất lượng và sự tin tưởng trong quá trình sử dụng. 
              Với chính sách bảo hành kéo dài đến 2 năm kể từ ngày mua
              </p>
            </div>
            <div>
              <div className="mt-10">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                  >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                          <img
                            src="https://1101.com.tw/wp-content/uploads/2023/08/%E8%9E%A2%E5%B9%95%E6%93%B7%E5%8F%96%E7%95%AB%E9%9D%A2-2023-08-03-111419.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://vcdn1-sohoa.vnecdn.net/2023/08/22/iphone-15-pro-burgandy-feature-8677-4236-1692676036.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=_8Mh4hskMuyVmIUssZy5-Q"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://genk.mediacdn.vn/139269124445442048/2023/5/25/gsmarena001-1685023384113-1685023384300931011538-1685029432768-16850294332911781318548.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://static.s-sfr.fr/media/mobile/Samsung/s23/02_01.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://m.economictimes.com/thumb/msid-96784562,width-1200,height-900,resizemode-4,imgsize-101478/samsung-galaxy-f04.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://cdn.xtmobile.vn/vnt_upload/news/01_2023/14/Samsung-cong-bo-Galaxy-A14-5G-xtmobile.jpg"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src="https://files.refurbed.com/ii/64-gb-schwarz-single-sim-1562659918.jpg?t=resize&h=630&w=1200"
                            alt=""
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  
                <Link
                  to="/productlist"
                  className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
                  >
                  Xem ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NewProduct/>
      <NewsLetter/>
      <Footer/>
    </>
    )
}
