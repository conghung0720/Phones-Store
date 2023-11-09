import { Avatar, Button, Progress, Rating, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import WriteComment from './WriteComment'
import axios from 'axios'

const DisplayComment = ({comments}) => {
    const [allRated, setAllRated] = useState({
        oneStar: 0,
        twoStar: 0,
        threeStar: 0,
        fourStar: 0,
        fiveStar: 0,
        peopleRated: 0
    })

    useEffect(() => {
      const totalRating = comments.reduce((sum, item) => sum + item.rating, 0);
      const peopleRated = comments.length;
  
      const oneStar = Math.round((comments.filter((item) => item.rating === 1).length / peopleRated) * 100);
      const twoStar = Math.round((comments.filter((item) => item.rating === 2).length / peopleRated) * 100);
      const threeStar = Math.round((comments.filter((item) => item.rating === 3).length / peopleRated) * 100);
      const fourStar = Math.round((comments.filter((item) => item.rating === 4).length / peopleRated) * 100);
      const fiveStar = Math.round((comments.filter((item) => item.rating === 5).length / peopleRated) * 100);
  
      setAllRated({
        oneStar,
        twoStar,
        threeStar,
        fourStar,
        fiveStar,
        peopleRated,
      });

    //   axios.get(`${process.env.REACT_APP_HOST}/`)
    }, [comments]);


  return (
    <div className='flex w-full mb-[6%]'>
        <div className='w-[30%] ml-[10%]'>
            <h1 className='font-bold text-[22px]'>Khách hàng đánh giá</h1>
            <div className="flex items-center gap-2">
            <Rating value={5} readonly />
            <Typography color="blue-gray" className="font-medium">
                Dựa trên {allRated.peopleRated} đánh giá
            </Typography>
        </div>
        <div className='mt-5 space-y-2'>
            <div className='flex gap-3 items-center'>
                <label>5 ⭐</label>
                <Progress color="amber" value={allRated.fiveStar} size="md" className='w-[70%]'/>
                <label>{allRated.fiveStar || 0}%</label>
            </div>
            <div className='flex gap-3 items-center'>
                <label>4 ⭐</label>
                <Progress color="amber" value={allRated.fourStar} size="md" className='w-[70%]'/>
                <label>{allRated.fourStar || 0}%</label>
            </div>
            <div className='flex gap-3 items-center'>
                <label>3 ⭐</label>
                <Progress color="amber" value={allRated.threeStar} size="md" className='w-[70%]'/>
                <label>{allRated.threeStar || 0}%</label>
            </div>
            <div className='flex gap-3 items-center'>
                <label>2 ⭐</label>
                <Progress color="amber" value={allRated.twoStar} size="md" className='w-[70%]'/>
                <label>{allRated.twoStar || 0}%</label>
            </div>
            <div className='flex gap-3 items-center'>
                <label>1 ⭐</label>
                <Progress color="amber" value={allRated.oneStar} size="md" className='w-[70%]'/>
                <label>{allRated.oneStar || 0}%</label>
            </div>
            <div className=''>
                <h1 className='font-bold text-[20px]'>Chia sẽ cảm nhận của bạn</h1>
                <p className='text-gray-800'>Vui lòng đánh giá giúp chúng mình để hiểu rõ hơn về sản phẩm.
                Lưu ý chỉ khi bạn đã mua mới được phép đánh giá.
                </p>
                <WriteComment/>
            </div>
        </div>
        </div>
        <div className='w-[43%] ml-[10%]  divide-y-2 space-y-5'>  
        {comments.length ? comments.map((val, index) => (
            <div key={index} className="flex items-center gap-4 mb-2 flex-wrap py-7">
                <Avatar src={val.userId.avatar} alt="avatar" />
                <div>
                <Typography variant="h6">{val.userId.userName}</Typography>
                <Rating value={val.rating} readonly />
                </div>
                <p className="italic w-full text-gray-800 leading-tight">
                    {val.comment}
                </p>
            </div>
            )) :  <div className="flex items-center gap-4 mb-2 flex-wrap py-7">
                    <p className="m-auto text-gray-800 leading-tight">
                        Hiện chưa có ai bình luận hết 😔 
                    </p>
                </div>}
        </div>
    </div>
  )
}

export default DisplayComment