import React, { useEffect, useState } from 'react';
import { Button, DialogBody, Dialog, DialogHeader, DialogFooter, Typography, IconButton } from "@material-tailwind/react";
import UserDetailAdmin from '.';
import { useGetUserByIdQuery } from '../../../../api/api';


export default function DialogDetail({children, userId}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);



  return (
  <>
    <div onClick={handleOpen} >
        {children}
  </div>
  
  <Dialog open={open} handler={handleOpen} 
        backdrop={{
          display: "grid",
          placeItems: "place-items-center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "w-screen",
          height: "h-screen",
          backgroundColor: "bg-black",
          backgroundOpacity: "bg-opacity-60",
          backdropFilter: "backdrop-blur-sm",
        }}
        className='w-[60%]'>
          <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">
            User
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
    <DialogBody className="h-[40em] overflow-y-scroll scrollbar-none scrollbar-thumb-gray-900 scrollbar-track-gray-100">
    {/* <DialogProduct setOpen={setOpen} productId={editProduct}/> */}
    <UserDetailAdmin userId={userId}/>
     </DialogBody>
     <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
  </Dialog>
  </>
  );
}
