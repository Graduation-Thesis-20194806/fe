import { Select, SelectProps } from "antd";
import clsx from "clsx";
import { FC } from "react";

type AppSelectProps = {
  error?: string;
} & SelectProps;

const AppSelect: FC<AppSelectProps> = ({ error = "", className, ...rest }) => {
  return (
    <Select
      {...rest}
      className={clsx("h-11", className)}
      status={error ? "error" : undefined}
    />
  );
};

export default AppSelect;
