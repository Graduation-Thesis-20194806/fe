import { Input } from 'antd';
import { PasswordProps } from "antd/es/input";
import clsx from "clsx";
import {
  ChangeEventHandler,
  useMemo,
} from "react";

type AppInputProps = {
  value: string | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  type?: "text" | "password";
  error?: string;
}

const AppInput = ({
  className,
  error,
  type = "text",
  ...rest
}: AppInputProps) => {
  const { InputComponent, inputProps } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let InputComponent = Input as any;
    let inputProps: PasswordProps = {};
    if (type === "password") {
      InputComponent = Input.Password;
      inputProps = {
        visibilityToggle: true,
      };
    }
    return { InputComponent, inputProps };
  }, [type]);

  return (
    <InputComponent
      {...rest}
      className={clsx("h-11", className)}
      status={error ? "error" : undefined}
      {...inputProps}
    />
  );
};

AppInput.displayName = "AppInput";

export default AppInput;
