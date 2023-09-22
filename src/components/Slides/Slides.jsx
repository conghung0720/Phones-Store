import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';   

const Slides = ({DATA}) => {

    return <>
      <Swiper 
      // install Swiper modules
      modules={[Autoplay,Navigation, Pagination, Scrollbar, A11y]}
      
      spaceBetween={50}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      >
      {
         
          DATA.map(value => <SwiperSlide><img className='w-full h-[24em] object-center' src={value.image}/></SwiperSlide>)
        }
    </Swiper>
        
    </>
}

export default Slides;