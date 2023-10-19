import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {  Callout, CalloutRoot } from '@radix-ui/themes'
import React from 'react'


const CalloutRadix = ({text, success = false}) => {
    
  return (
    <CalloutRoot className='bg-rose-200 rounded-lg flex p-5' color="red" role="alert">
    <Callout.Icon className='text-center mt-[1.5px] mr-2 p-1 text-rose-600'>
      <ExclamationTriangleIcon />
    </Callout.Icon>
    <Callout.Text className='text-rose-600'>
      {text}
    </Callout.Text>
  </CalloutRoot>
  )
}

export default CalloutRadix