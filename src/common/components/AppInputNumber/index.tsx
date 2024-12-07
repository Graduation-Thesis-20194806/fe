import { InputNumber } from "antd";
import {
  ReactNode,
} from "react";

type AppInputNumberProps = {
  value?: number;
  onChange: (value: number | null) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  suffix?: ReactNode;
  min?: number;
};

const AppInputNumber = ({ error = "", ...rest }: AppInputNumberProps) => {
  return (
    <InputNumber
      {...rest}
      className="h-11 w-full"
      size="large"
      status={error ? "error" : undefined}
      min={0}
      controls={false}
    />
  );
};

AppInputNumber.displayName = "AppInputNumber";

export default AppInputNumber;
