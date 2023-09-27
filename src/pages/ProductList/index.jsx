import React from 'react'
import FilterCategory from './Filter/FilterCategory'
import ItemList from './ItemList'
import Footer from '../../components/Footer/Footer'
import BannerHead from '../../components/Banner/BannerHead'
import SuggestSearch from '../../components/Search/SuggestSearch'

const ProductList = () => {
  return (
    <>
    <FilterCategory>
        <ItemList/>
    </FilterCategory>
    <Footer/>
    </>
  )
}

export default ProductList