import React, { useEffect, useState } from 'react';
import SelectColor from './SelectColor';
import { useNewProductMutation, useUpdateProductMutation } from '../../../api/api';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import CalloutRadix from '../../../components/Form/Callout';

export function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}

const DialogProduct = ({productId, setOpen}) => {
  const [newProduct, result] = useNewProductMutation();
  const [editProduct ] = useUpdateProductMutation();
  const [color, setColor] = useState();

  const [product, setProduct] = useState({
    name: '',
    brand: '',
    main_image: null,
    main_image_base64: '', // Added to store main image as base64
    attributes: [],
    description: '',
    highlights: [''],
    quantity_sold: 1,
    quantity: 0,
    detail: '',
  });

  const [sharedImageUrl, setSharedImageUrl] = useState('');
  const [images, setImages] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    const [indexAttr, nameAttr] = name?.split('.');
    const updatedAttributes = product.attributes.map((attr, index) => {
      if (index === +indexAttr) {
        return { ...attr, [nameAttr]: value };
      }
      return attr;
    });

    setProduct({ ...product, [name]: value });
  };

  const handleChangeAttirbutes = (e) => {
    const { name, value } = e.target;

    const [indexAttr, nameAttr] = name?.split('.');
    const updatedAttributes = product.attributes.map((attr, index) => {
      if (index === +indexAttr) {
        if (nameAttr === 'price' || nameAttr === 'quantity')
          return { ...attr, color: 'Màu xanh lá', class: 'bg-green-600', [nameAttr]: +value };
        else return { ...attr, color: 'Màu xanh lá', class: 'bg-green-600', [nameAttr]: value };
      }
      return attr;
    });

    setProduct({ ...product, attributes: updatedAttributes });
  };

  const handleAddColor = () => {
    setProduct({
      ...product,
      attributes: [...product.attributes, { color: '', price: 0, quantity: 0, image: null }],
    });
  };

  const handleRemoveColor = (index) => {
    const updatedColors = [...product.attributes];
    updatedColors.splice(index, 1);
    setProduct({ ...product, attributes: updatedColors });
  };

  const handleSharedImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    // setProduct({ ...product, main_image: selectedImage });

    // Load the shared image for preview
    const imageUrl = URL.createObjectURL(selectedImage);
    setSharedImageUrl(imageUrl);

    // Convert the selected image to base64
    const base64Image = await convertToBase64(selectedImage);
    setProduct({ ...product, main_image: base64Image });
  };

  const handleAddHighlight = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      highlights: [...prevProduct.highlights, ''],
    }));
  };

  const handleRemoveHighlight = (index) => {
    setProduct((prevProduct) => {
      const updatedHighlights = [...prevProduct.highlights];
      updatedHighlights.splice(index, 1);
      return {
        ...prevProduct,
        highlights: updatedHighlights,
      };
    });
  };

  const handleImageUpload = async (e, colorIndex) => {
    const selectedImage = e.target.files[0];
    const updatedColors = [...product.attributes];
    updatedColors[colorIndex].image = selectedImage;

    // Load the color-specific image for preview
    const imageUrl = URL.createObjectURL(selectedImage);
    const updatedImages = [...images];
    updatedImages[colorIndex] = imageUrl;
    setImages(updatedImages);

    // Convert the selected image to base64
    const base64Image = await convertToBase64(selectedImage);
    updatedColors[colorIndex].image = base64Image;

    setProduct({ ...product, attributes: updatedColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    !productId && await newProduct(product).then((res) => {
      //Success
      setOpen(false)
      CalloutRadix('Thành công')
      return;
    });

    productId && await editProduct({...product, _id: productId})
    .then(res => {
      setOpen(false)
      CalloutRadix('Thành công')
      return;
    })
  };

  useEffect(() => {
    productId && axios.get(`${process.env.REACT_APP_HOST}product/${productId}`)
    .then(res => {
      setProduct(res.data)
      setImages(res.data.attributes?.map(value => value.image))
      setSharedImageUrl(res.data.main_image)
    })
    // await newProduct
  }, [productId]);

  return (
    <form className="max-w-screen-lg mx-auto p-4">
    {/* <h2 className="text-2xl font-semibold text-gray-900 mb-6">Thêm sản phẩm</h2> */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
          Tên sản phẩm
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder='Nhập tên sản phẩm'
          value={product.name}
          required
          onChange={handleInputChange}
          className="w-[550px] rounded-full border border-gray-300 py-2 px-4 focus:ring-2 placeholder:text-gray-400 focus:ring-inset focus:ring-indigo-600"
        />
      </div>

      {/* <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-1">
          Công ty
        </label>
        <select
          name="category"
          id="category"
          value={product.category}
          onChange={handleInputChange}
          className="w-full rounded-full border border-gray-300 py-2 px-4 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
        </select>
      </div> */}
    </div>

    <label htmlFor="description" className="block text-sm font-medium text-gray-900 mt-6 mb-1">
      Mô tả
    </label>

    
    <textarea
      name="description"
      id="description"
      value={product.description}
      placeholder='Nhập mô tả chi tiết sản phẩm'
      onChange={handleInputChange}
      className="w-full rounded-md border border-gray-300 py-2 px-4 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600"
      />

    <div class="border-t border-slate-600 mt-[5%]"></div>      

    <label htmlFor="highlights" className="block text-sm font-medium text-gray-900 mt-6 mb-1">
      Điểm nhấn
    </label>
    <ul>
      {product.highlights.map((highlight, index) => (
        <li key={index} className="flex items-center mb-3">
          <input
            type="text"
            value={highlight}
            placeholder='Ví dụ: Mạnh mẽ, siêu nhanh với chip A14, RAM 4GB, mạng 5G tốc độ cao'
            onChange={(e) => {
              const updatedHighlights = [...product.highlights];
              updatedHighlights[index] = e.target.value;
              setProduct({ ...product, highlights: updatedHighlights });
            }}
            className="w-full rounded-full border border-gray-300 py-2 px-4 focus:ring-1 focus:ring-indigo-600 focus:ring-offset-1 focus:ring-offset-indigo-600"
            />
          <Button
            type="Button"
            onClick={() => handleRemoveHighlight(index)}
            className=" ml-2 flex items-center gap-3 bg-rose-600 text-black"
            >
            <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M724.3 198H296.1l54.1-146.6h320z" fill="#FAFCFB" /><path d="M724.3 216.5H296.1c-6.1 0-11.7-3-15.2-7.9-3.5-5-4.3-11.3-2.2-17L332.8 45c2.7-7.3 9.6-12.1 17.4-12.1h320c7.7 0 14.7 4.8 17.4 12.1l54.1 146.6c2.1 5.7 1.3 12-2.2 17-3.5 4.9-9.2 7.9-15.2 7.9z m-401.6-37h375.1L657.3 69.9H363.1l-40.4 109.6z" fill="#0F0F0F" /><path d="M664.3 981.6H339.7c-54.2 0-98.5-43.3-99.6-97.5L223.7 235h572.9l-32.8 651.4c-2.3 53.2-46.1 95.2-99.5 95.2z" fill="#9DC6AF" /><path d="M664.3 995H339.7c-29.7 0-57.8-11.4-79-32.2-21.2-20.8-33.3-48.6-34-78.3L210 221.6h600.7L777.2 887c-2.6 60.5-52.2 108-112.9 108zM237.4 248.3l16 635.5c0.5 22.7 9.7 44 25.9 59.8 16.2 15.9 37.7 24.6 60.4 24.6h324.6c46.3 0 84.2-36.2 86.2-82.5l32.1-637.4H237.4z" fill="#191919" /><path d="M827.1 239.5H193.3c-22.2 0-40.4-18.2-40.4-40.4v-2.2c0-22.2 18.2-40.4 40.4-40.4h633.8c22.2 0 40.4 18.2 40.4 40.4v2.2c0 22.2-18.2 40.4-40.4 40.4z" fill="#D39E33" /><path d="M826 252.9H194.4c-30.3 0-54.9-24.6-54.9-54.9 0-30.3 24.6-54.9 54.9-54.9H826c30.3 0 54.9 24.6 54.9 54.9s-24.7 54.9-54.9 54.9z m-631.6-83.1c-15.5 0-28.2 12.6-28.2 28.2s12.6 28.2 28.2 28.2H826c15.5 0 28.2-12.6 28.2-28.2 0-15.5-12.6-28.2-28.2-28.2H194.4z" fill="#111111" /><path d="M354.6 430.3v369.6" fill="#FAFCFB" /><path d="M354.6 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c-0.1 7.4-6 13.4-13.4 13.4z" fill="#0F0F0F" /><path d="M458.3 430.3v369.6" fill="#FAFCFB" /><path d="M458.3 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c0 7.4-6 13.4-13.4 13.4z" fill="#0F0F0F" /><path d="M562.1 430.3v369.6" fill="#FAFCFB" /><path d="M562.1 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c-0.1 7.4-6.1 13.4-13.4 13.4z" fill="#0F0F0F" /><path d="M665.8 430.3v369.6" fill="#FAFCFB" /><path d="M665.8 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c0 7.4-6 13.4-13.4 13.4z" fill="#0F0F0F" /></svg>
            Xóa
          </Button>
        </li>
      ))}
    </ul>
    <div className='flex justify-center'>
    <Button
      type="button"
      onClick={handleAddHighlight}
      className="rounded-full bg-indigo-600 text-white py-2 px-4 text-sm font-semibold hover:bg-indigo-500"
      >  

        Thêm mới điểm nhấn
    </Button>
      </div>

    <div class="border-t border-black mt-[5%]"></div>      
    <label htmlFor="images" className="block text-sm font-medium text-gray-900 mt-6 mb-1">
      Màu sắc
    </label>
    {product.attributes?.map((color, index) => (
      <div key={index} className="mb-4">
        <SelectColor name={`${index}.color`} inputChange={setColor}/>
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mt-1 mb-1">
          Giá
        </label>
        <input
          type="number"
          min={1}
          name={`${index}.price`}
          value={Number(color.price)}
          onChange={handleChangeAttirbutes}
          placeholder="Giá"
          required
          className="w-full rounded-full border border-gray-300 py-2 px-4 mt-2 focus:ring-1 focus:ring-indigo-600  focus:ring-offset-indigo-600"
          />
        <label htmlFor="description" className="block text-sm font-medium text-gray-900 mt-1 mb-1">
          Số lượng
        </label>
        <input
          type="number"
          name={`${index}.quantity`}
          value={+color.quantity}
          onChange={handleChangeAttirbutes}
          placeholder="Số lượng"
          required
          min={0}
          className="w-full rounded-full border border-gray-300 py-2 px-4 mt-2 focus:ring-1 focus:ring-indigo-600 focus:ring-offset-indigo-600"
          />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, index)}
          id={`color-image-upload-${index}`}
          className="hidden"
          />

        <label
          htmlFor={`color-image-upload-${index}`}
          className="relative cursor-pointer rounded-full bg-white font-semibold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 hover:text-indigo-500"
          >
          <div>Thêm hình ảnh của màu</div>
        </label>
        {images[index] && (
          <img
          src={images[index]}
          alt={`Color ${index + 1}`}
          className="w-48 h-48 object-cover rounded-md mt-2"
          />
          )}
        <Button
          type="button"
          onClick={() => handleRemoveColor(index)}
          className="text-black flex items-center gap-3 bg-rose-600 mt-2"
          >
          <svg width="20px" height="20px" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M724.3 198H296.1l54.1-146.6h320z" fill="#FAFCFB" /><path d="M724.3 216.5H296.1c-6.1 0-11.7-3-15.2-7.9-3.5-5-4.3-11.3-2.2-17L332.8 45c2.7-7.3 9.6-12.1 17.4-12.1h320c7.7 0 14.7 4.8 17.4 12.1l54.1 146.6c2.1 5.7 1.3 12-2.2 17-3.5 4.9-9.2 7.9-15.2 7.9z m-401.6-37h375.1L657.3 69.9H363.1l-40.4 109.6z" fill="#0F0F0F" /><path d="M664.3 981.6H339.7c-54.2 0-98.5-43.3-99.6-97.5L223.7 235h572.9l-32.8 651.4c-2.3 53.2-46.1 95.2-99.5 95.2z" fill="#9DC6AF" /><path d="M664.3 995H339.7c-29.7 0-57.8-11.4-79-32.2-21.2-20.8-33.3-48.6-34-78.3L210 221.6h600.7L777.2 887c-2.6 60.5-52.2 108-112.9 108zM237.4 248.3l16 635.5c0.5 22.7 9.7 44 25.9 59.8 16.2 15.9 37.7 24.6 60.4 24.6h324.6c46.3 0 84.2-36.2 86.2-82.5l32.1-637.4H237.4z" fill="#191919" /><path d="M827.1 239.5H193.3c-22.2 0-40.4-18.2-40.4-40.4v-2.2c0-22.2 18.2-40.4 40.4-40.4h633.8c22.2 0 40.4 18.2 40.4 40.4v2.2c0 22.2-18.2 40.4-40.4 40.4z" fill="#D39E33" /><path d="M826 252.9H194.4c-30.3 0-54.9-24.6-54.9-54.9 0-30.3 24.6-54.9 54.9-54.9H826c30.3 0 54.9 24.6 54.9 54.9s-24.7 54.9-54.9 54.9z m-631.6-83.1c-15.5 0-28.2 12.6-28.2 28.2s12.6 28.2 28.2 28.2H826c15.5 0 28.2-12.6 28.2-28.2 0-15.5-12.6-28.2-28.2-28.2H194.4z" fill="#111111" /><path d="M354.6 430.3v369.6" fill="#FAFCFB" /><path d="M354.6 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c-0.1 7.4-6 13.4-13.4 13.4z" fill="#0F0F0F" /><path d="M458.3 430.3v369.6" fill="#FAFCFB" /><path d="M458.3 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c0 7.4-6 13.4-13.4 13.4z" fill="#0F0F0F" /><path d="M562.1 430.3v369.6" fill="#FAFCFB" /><path d="M562.1 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c-0.1 7.4-6.1 13.4-13.4 13.4z" fill="#0F0F0F" /><path d="M665.8 430.3v369.6" fill="#FAFCFB" /><path d="M665.8 813.3c-7.4 0-13.4-6-13.4-13.4V430.3c0-7.4 6-13.4 13.4-13.4s13.4 6 13.4 13.4v369.6c0 7.4-6 13.4-13.4 13.4z" fill="#0F0F0F" /></svg>
          Xóa màu
        </Button>
      </div>
    ))}
    <Button
      type="button"
      onClick={handleAddColor}
      className="rounded-full m-auto flex items-center gap-3 bg-slate-800 text-black py-2 hover:text-white px-4 text-sm font-semibold hover:bg-indigo-500"
      >
    <svg width="30px" height="30px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M10.5 10.5c.002 2.762-2.237 5-5 5s-5.002-2.238-5-5c-.002-2.76 2.237-5 5-5s5.002 2.24 5 5z" color="#000000" fill="#ff15a1" stroke="#373737" stroke-width=".49999682600000006"/><path d="M8 1.401a4.998 4.998 0 0 0-2.488 9.334c-.004-.078-.012-.155-.012-.234a4.998 4.998 0 0 1 7.488-4.334A4.994 4.994 0 0 0 8 1.4z" fill="#1583ff"/><path d="M10.5 5.5a4.998 4.998 0 0 0-5 5c0 .08.008.157.012.235A4.998 4.998 0 0 0 13 6.401c0-.079-.008-.156-.012-.234A4.975 4.975 0 0 0 10.5 5.5z" fill="#00cf2d"/><path d="M12.988 6.167c.004.078.012.155.012.234a4.998 4.998 0 0 1-7.489 4.334 4.994 4.994 0 0 0 4.989 4.766 4.998 4.998 0 0 0 2.488-9.334z" fill="#f8ff15"/><path d="M5.512 10.735a4.996 4.996 0 0 0 2.486 4.093 4.987 4.987 0 0 0 2.49-4.091A4.978 4.978 0 0 1 8 11.4a4.975 4.975 0 0 1-2.488-.666z" fill="#ef0000"/><path d="M7.998 6.173A4.991 4.991 0 0 0 5.5 10.5c0 .079.008.156.012.234a4.978 4.978 0 0 0 4.977.002c.003-.079.011-.157.011-.236a4.99 4.99 0 0 0-2.502-4.328z" fill="#383027"/><path d="M5.5 5.5c-.91 0-1.76.247-2.494.67a4.99 4.99 0 0 0 2.506 4.564c-.004-.077-.012-.154-.012-.233a4.991 4.991 0 0 1 2.498-4.328A4.975 4.975 0 0 0 5.5 5.5z" fill="#5100cc"/><path d="M8 1.401a4.998 4.998 0 0 0-4.994 4.77 4.998 4.998 0 1 0 4.992 8.658 4.998 4.998 0 1 0 4.99-8.662A4.994 4.994 0 0 0 8 1.4z" fill="none" stroke="#373737" stroke-width=".9999936520000001"/></svg>
      Thêm mới màu
    </Button>

    <div class="border-t border-slate-600 mt-[5%]"></div>      

    <label htmlFor="sharedImage" className="block text-sm font-medium text-gray-900 mt-6 mb-1">
      Ảnh giới thiệu sản phẩm
    </label>
    <input
      type="file"
      accept="image/*"
      onChange={handleSharedImageUpload}
      id="shared-image-upload"
      className="hidden"
      />
    <label
      htmlFor="shared-image-upload"
      className="relative cursor-pointer rounded-full bg-white font-semibold text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 hover:text-indigo-500"
      >
      <span>Upload ảnh</span>
    </label>
    {sharedImageUrl && (
      <img
      src={sharedImageUrl}
      alt="Shared Product Image"
      className="w-48 h-48 object-cover rounded-md mt-2"
      />
      )}


    <div className="mt-6 flex items-center justify-end space-x-6">
      <button type="button" className="text-sm font-semibold text-gray-900">
        
      </button>
      <button
        onClick={handleSubmit}
        type="submit"
        className="rounded-full bg-indigo-600 text-white py-2 px-4 text-sm font-semibold hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-indigo-600"
        >
        Thêm sản phẩm
      </button>
    </div>
  </form>
  )
}

export default DialogProduct