import { Link } from "react-router-dom";
import SignupForm from "./Form/SignupForm";

export default function Signup() {
  return (
    <>
      <div className="flex">
        <img
          className="h-screen w-[45%] object-center"
          loading="lazy"
          src="https://images2.thanhnien.vn/528068263637045248/2023/6/26/1-16877379377471288584933.jpg"
        />
        <div className="w-full flex items-center">
          <Link to="/signin">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:bg-slate-200 h-9 px-4 py-2 absolute right-4 top-4 md:right-8 md:top-8">
              Đăng nhập
            </button>
          </Link>
          <div className="lg:p-8 m-auto">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Tạo tài khoản
                </h1>
                <p className="text-sm text-slate-600">
                  Nhập vào thông tin của bạn để tạo tài khoản
                </p>
              </div>
            </div>
            <div className="grid gap-6 mt-[9px]">
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
