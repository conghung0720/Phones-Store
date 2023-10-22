import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, PresentationChartLineIcon } from "@heroicons/react/24/outline";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
 
export default function Sidebar({ selectedMenuItem, handleMenuItemClick }) {
  const [open, setOpen] = React.useState(0);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className="h-screen bg-slate-900 text-gray-200 w-full max-w-[20rem] fixed p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Link to="/">
        <Typography variant="h5" color="blue-gray" className="text-red-600 font-bold">
          Admin
        </Typography>
        </Link>
      </div>
      <List>
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              // className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
            />
          }
        >
          <ListItem className="p-0 " selected={open === 1}>
            {/* <AccordionHeader onClick={() => handleMenuItemClick(1)} className="border-b-0 p-3">
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5 mr-0" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Danh sách người dùng
              </Typography>
            </AccordionHeader> */}
          </ListItem>
        </Accordion>
        <Accordion
          open={open === 2}
        >
          <ListItem className="p-0" selected={open === 2}>
            {/* <AccordionHeader onClick={() => handleMenuItemClick(2)} className="border-b-0 p-3">
              <ListItemPrefix>
                <ShoppingBagIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Danh sách đơn hàng
              </Typography>
            </AccordionHeader> */}
          </ListItem>

          <ListItem className="p-0" selected={open === 2}>
            <AccordionHeader onClick={() => handleMenuItemClick(3)} className="border-b-0 p-3">
              <ListItemPrefix>
                <BookmarkFilledIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography color="blue-gray" className="mr-auto font-normal">
                Danh sách sản phẩm
              </Typography>
            </AccordionHeader>
          </ListItem>
        
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Tin nhắn
          <ListItemSuffix>
            <Chip value="3" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Đăng xuất
        </ListItem>
      </List>
    </Card>
  );
}