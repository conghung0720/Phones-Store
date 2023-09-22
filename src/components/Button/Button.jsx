import React from "react";
import Gmail from "../Icons/Gmail";
import Spinner from "../Icons/Spinner";

const Button = ({
  colorButton = "bg-black",
  textColor = "text-white",
  icon = false,
  title = "Button",
  type = "button",
  loading = false,
  ...props
}) => {
  const loadingIconSvg = loading ? !icon : icon;
  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ${colorButton} ${textColor} shadow hover:bg-primary/90 h-9 px-4 py-2`}
    >
      {loading && (
        // <span className="animate-spin">
        <Spinner />
        // </span>
      )}
      {icon && loadingIconSvg && <Gmail className="w-5" />}
      <span className="ml-2">{title}</span>
    </button>
  );
};

export default Button;
