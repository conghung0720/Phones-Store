import React from 'react'
import { useGetListPhonesQuery } from '../../api/api'

const Home = () => {
  const {data: isData} = useGetListPhonesQuery();

  console.log(isData);
  return (
    <div>Home</div>
  )
}

export default Home