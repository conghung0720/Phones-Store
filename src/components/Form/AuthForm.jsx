import React, { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";

//(TypeAuth = true) tương đương form đăng ký
const AuthForm = ({ typeAuth = true }) => {
  const [isLoading, setIsLoading] = useState(false);
  let titleButton = typeAuth ? "Đăng ký" : "Đăng nhập";

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  // const titleButton =
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1 space-y-3">
            <Input
              placeHolder="Điền tài khoản"
              type="text"
              disabled={isLoading}
            />
            <Input
              disabled={isLoading}
              placeHolder="Điền mật khẩu"
              type="password"
              required
            />
            {typeAuth && (
              <Input
                placeHolder="name@example.com"
                type="email"
                autocomplete="email"
                disabled={isLoading}
              />
            )}
          </div>
          <Button
            disabled={isLoading}
            loading={isLoading}
            title={titleButton}
            colorButton="bg-black"
            textColor="text-white"
            type="submit"
          />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span class="w-full border-t"></span>
        </div>
        <div class="relative flex justify-center text-xs uppercase">
          <span class="bg-white px-2 ">
            <span class="align-middle">Hoặc tiếp tục với</span>
          </span>
        </div>
      </div>
      <Button
        disabled={isLoading}
        loading={isLoading}
        icon={true}
        colorButton="bg-white"
        textColor="text-black"
        title="Gmail"
      />
      <div className="w-[60%] m-auto">
        <p class="px-8 text-center text-sm text-slate-600">
          By clicking continue, you agree to our{" "}
          <a
            class="underline underline-offset-4 hover:text-primary"
            href="/terms"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            class="underline underline-offset-4 hover:text-primary"
            href="/privacy"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </>
  );
};

export default AuthForm;
