import React from 'react'

const SuggestSearch = ({setKeyword, keyword}) => {
    // const dataSearch = data?.filter(value => value.includes())

    const handleChangeData = (e) => {
        setKeyword(e.target.value)
    }

  return (
   <input className='rounded-lg border-[1.5px]' onChange={handleChangeData} value={keyword} placeholder='Tìm kiếm'/>
  )
}

export default SuggestSearch