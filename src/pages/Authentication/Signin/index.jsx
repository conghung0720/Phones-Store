import React from "react";
import { Link } from "react-router-dom";
import SigninForm from "./Form/SigninForm";
import CalloutRadix from "../../../components/Form/Callout";

const Signin = () => {
  return (
    <>
      <div className="h-screen flex">
        <div className="w-[50%] grid gap-6 mt-[9px]  items-center">
          <div className="space-y-8 m-auto ">

            <div className="mb-9 text-center">
              {/* <img
                className="h-[160px] w-[160px] m-auto"
                src="https://png.pngtree.com/template/20190423/ourlarge/pngtree-smart-phone-logo-template-design-smart-phone-logo-with-modern-image_144959.jpg"
              /> */}
              <h2 className="text-[20px] font-bold mb-2">
                Đăng nhập bằng tài khoản
              </h2>
              <p>
                Bạn chưa đăng ký?{" "}
                <span className="text-blue-600 font-semibold ">
                  <Link to="/signup">Bấm vào đây</Link>
                </span>
              </p>
            </div>
            <SigninForm />
          </div>
        </div>
        <div className="w-[50%] ">
          <img
            className="h-full object-cover "
            src="https://www.slashgear.com/img/gallery/how-to-personalize-the-call-background-on-your-samsung-phone/l-intro-1674766457.jpg"
          />
        </div>
      </div>
    </>
  );
};

export default Signin;
