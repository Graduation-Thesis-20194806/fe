import { Button } from "antd";
import {
  FC,
} from "react";
import clsx from "clsx";
import { ButtonHTMLType, ButtonProps, ButtonType } from "antd/es/button";

type AppButtonProps = {
  text: string;
} & ButtonProps;

const AppButton: FC<AppButtonProps> = ({
  text,
  onClick: handleClick,
  className,
  type = "primary",
  htmlType,
  disabled,
  loading,
  icon,
  size,
  variant,
  ...rest
}) => {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <Button
      type={type}
      className={clsx(
        "shadow-none",
        {
          "font-semibold h-11 w-fit": size != "small",
          "w-full": size == "large",
          "text-base w-fit": size == "middle",
          "font-normal text-sm p-0": type === "link",
        },
        className
      )}
      onClick={handleClick}
      htmlType={htmlType}
      disabled={disabled}
      loading={loading}
      icon={icon}
      variant={variant}
      {...rest}
    >
      <div>{text} </div>
    </Button>
  );
};

export default AppButton;
