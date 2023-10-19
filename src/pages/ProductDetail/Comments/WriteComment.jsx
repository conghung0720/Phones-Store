import { Textarea, Button, IconButton, Dialog, DialogHeader, DialogFooter, DialogBody, Typography, Rating } from "@material-tailwind/react";
import { useState } from "react";
import { useCommentProductMutation } from "../../../api/api";
import { store } from "../../../store";
import { useParams } from "react-router-dom";
 
export default function WriteComment() {
  const {productId} = useParams()
  const [open, setOpen] = useState(false);
  const [rated, setRated] = useState(1);
  const [text, setText] = useState('')

  const {userInfo} = store.getState().reducer;
  
  const [comment] = useCommentProductMutation()

  const handleOpen = () => setOpen(!open)

  const handleText = () => {
    setText()
  }

  const handleReview = async () => {
    await comment({userId: userInfo._id, productId, rating: rated, comment: text})
    .then(res => {
      if(res.error?.status === 403) return alert(res.error.data.message)
      if(res.data) setOpen(!open)
      // if 
    })
  }
  return (
    <>
    <Button fullWidth onClick={handleOpen} className='mt-8' variant="outlined">Viết đánh giá sản phẩm</Button>
    <Dialog open={open} handler={handleOpen} 
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        backdrop={{
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropFilter: "backdrop-blur-sm",
        }}
        className='w-[30%]'>
          <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            Đánh giá sản phẩm
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
          </IconButton>
        </DialogHeader>
    <DialogBody className="overflow-y-scroll scrollbar-none scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    <div className="relative w-full">
      <div className="flex justify-center mb-3">
      <Rating value={1} onChange={(value) => setRated(value)}/>
      </div>
    <Textarea value={text} onChange={(e) => setText(e.target.value)} className="border-0 focus:border-0 focus:outline-none" variant="static" placeholder="Viết đánh giá sản phảm" rows={8} />
      <div className="flex w-full justify-between py-1.5">
        <IconButton variant="text" color="blue-gray" size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
            >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
          </svg>
        </IconButton>
        <div className="flex gap-2">
          <Button size="sm" color="red" variant="text" className="rounded-md">
            Hủy
          </Button>
          <Button onClick={handleReview} size="sm" className="rounded-md">
            Đánh giá
          </Button>
        </div>
      </div>
      </div>
     </DialogBody>
  </Dialog>
   </>

  );
}