import React from 'react'
import FilterCategory from './Filter/FilterCategory'
import ItemList from './ItemList'
import Footer from '../../components/Footer/Footer'


const ProductList = () => {
  return (
    <>
      <FilterCategory>
        <ItemList />
      </FilterCategory>
      <Footer />
    </>
  );
}

export default ProductList