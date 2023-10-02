import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import Header from '../../components/Header/Header'
import ThumbsGallery from '../../components/Slides/ThumbsGallery/ThumbsGallery'
import { useAddToCartMutation, useGetProductByIdQuery } from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { formattedPrice } from '../../utils/formatedPrice'
import Footer from '../../components/Footer/Footer'
import { store } from '../../store'
import { ToastContainer, toast } from 'react-toastify'
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
  const [addToCart, {loadCart}] = useAddToCartMutation();
  const { userInfo } = store.getState().reducer
  const navigate = useNavigate()

  const [getColor, setColor] = useState("");
  const [indexAttr, setIndexAttr] = useState(0);
  const [price, setPrice] = useState("");
  // const [selectedSize, setSelectedSize] = useState(product.sizes[0])


  const handleAddToCart = async (e) => {
    e.preventDefault()
    if(!userInfo) {
      navigate('/signin')
     
    }


    const { _id: userId} = userInfo
    const {name, description, main_image} = isData
    const { color, id, price, image } = isData.attributes[indexAttr]
    await addToCart({
      productId,
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
    })

    toast.success("Thêm thành công!", {
      position: "top-right",
      autoClose: 3000,
  
    });
  }

  const handleChangeColor = (e) => {
    const indexColor = +e.currentTarget.getAttribute('indexcolor')
    setPrice(isData.attributes[indexColor].price)
    setIndexAttr(indexColor)
  }
  
  isData && !price && setPrice(isData.attributes[0].price)
  
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
        <div className="mx-auto max-w-2xl  px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
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
          
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Màu sắc</h3>
        
                </div>

                <RadioGroup className="mt-4">
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {isData.attributes.map((value, index) => (
                      <RadioGroup.Option
                      key={index}
                      value={index}
                      indexColor={index}
                      onClick={handleChangeColor}
                      disabled={value.quantity <= 0}
                      className={({ active }) =>
                      classNames(
                        value.quantity
                        ? `cursor-pointer ${value.class} text-gray-900 shadow-sm `
                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                        active ? 'ring-2 ring-indigo-500' : '',
                        'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:shadow-2xl focus:outline-none sm:flex-1 sm:py-6'
                        )
                      }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label className={"h-6"} as="span">{}</RadioGroup.Label>
                            {value.quantity ? (
                              <span
                              
                              className={classNames(
                                active ? 'border' : 'border-2',
                                checked ? 'border-indigo-500' : 'border-transparent',
                                'pointer-events-none absolute -inset-px rounded-md'
                                )}
                                aria-hidden="true"
                                />
                            ) : (
                              <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                  >
                                  <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                onClick={handleAddToCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                Thêm vào giỏ hàng
              </button>
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
    <Footer/>
    <ToastContainer/>
   </>
  )
}
