import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import Header from '../../components/Header/Header'
import ThumbsGallery from '../../components/Slides/ThumbsGallery/ThumbsGallery'
import { useAddToCartMutation, useGetCartUserQuery, useGetProductByIdQuery } from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { formattedPrice } from '../../utils/formatedPrice'
import Footer from '../../components/Footer/Footer'
import { store } from '../../store'
import ToastRadix from '../../components/Form/Toast'
import { IconButton } from '@material-tailwind/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import WriteComment from './Comments/WriteComment'
import DisplayComment from './Comments/DisplayComment'

const product = {
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Iphone', href: '#' },
  ],
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductDetail() {
  const {productId} = useParams()
  const {data: isData, isLoading, isSuccess} = useGetProductByIdQuery({idProduct: productId});
  const {data: getCart, isSuccess: isSuccesV2} = useGetCartUserQuery();
  console.log(getCart);
  const [addToCart, {loadCart}] = useAddToCartMutation();
  const { userInfo } = store.getState().reducer
  const navigate = useNavigate()


  const [getColor, setColor] = useState("");
  const [indexAttr, setIndexAttr] = useState(0);
  const [price, setPrice] = useState("");
  const [isOpenToast, setOpenToast] = useState(false);
  const [titleToast, setTitleToast] = useState('Thêm vào giỏ hàng thành công')
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  // console.log(isData);

  const handleAddToCart = async (e) => {
    e.preventDefault()
    if(!userInfo) {
      navigate('/signin')
     
    }

    const { _id: userId} = userInfo
    const {name, description, main_image} = isData
    // console.log(userId);

    const { color, id, price, image, quantity} = isData.attributes[indexAttr]
    if(!isSuccesV2) return;
    console.log(getCart);
    const checkQuantityItem = getCart.items_cart?.some(value => {
      return value.productId === productId && +value.id === id && value.quantity + 1 > quantity
    })
    console.log(checkQuantityItem);
    console.log();
    if(checkQuantityItem) {
      return alert('Sản phẩm trong giỏ hàng đã vượt quá sản phẩm có sẵn')
    }
      await addToCart({
      productId,
      old_quantity: 1,
      userId,
      name,
      description,
      color,
      id,
      class: isData.attributes[indexAttr].class,
      quantity: +1,
      devide_storage: "128GB",
      price,
      image
    }).then(res => {
        console.log(res.data);
        setOpenToast(true);
    })

  }

  const handleChangeColor = (e) => {
    const indexColor = +e.currentTarget.getAttribute('indexcolor')
    setPrice(isData.attributes[indexColor].price)
    setIndexAttr(indexColor)
  }
  
  useEffect(() => {
    isData && !price && setPrice(isData.attributes.filter(val => val.quantity > 0)[0].price)
  }, [])
  
  return (<>
  <Header/>
   {isSuccess && <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
              \
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {isData.name}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
     

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{isData.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
              <ThumbsGallery images={isData.attributes.map(value => value.image)}/>
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{formattedPrice(price)}</p>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Đánh giá</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                      />
                      ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
                {isData.attributes.map((val, index) => {
                  if(val.quantity < 0) return <IconButton className={` mr-1.5 bg-slate-100 border-2 blur-2 cursor-not-allowed`}>
                    <XMarkIcon className='w-8 h-8 text-red-600'/>
                  </IconButton>
                  return <IconButton onClick={() => setIndexAttr(index)} className={`rounded- mr-1.5 ${val.class} focus:outline-2 focus:ring-2`}></IconButton>
                })
                }
                {isData.attributes.map((value, index) => 
                  indexAttr === index && <p className='mt-5'>
                  <span className={`font-bold`}>{value.color}</span> còn {value.quantity} sản phẩm
                </p>
                  ) 
                }
              {/* Sizes */}
  

              {/* <button
                onClick={handleAddToCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none"
                >
                Thêm vào giỏ hàng
              </button> */}
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{isData.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Đặc điểm nổi bật</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {isData.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Chi tiết</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{isData.detail}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>}
    <div className='mt-[-6%]'>
    {/* <WriteComment/> */}
    {/* {isData?.comments && <DisplayComment comments={isData.comments}/>} */}
    </div>
    <ToastRadix title={titleToast} position='left' isOpen={isOpenToast} setOpen={setOpenToast}/>
    <Footer/>
   </>
  )
}
