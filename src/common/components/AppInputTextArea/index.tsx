import TextArea, { TextAreaProps } from "antd/es/input/TextArea";
type AppInputTextAreaProps = {
  error?: string;
} & TextAreaProps;

const AppInputTextArea = ({ error, ...rest }: AppInputTextAreaProps) => {
  return <TextArea {...rest} status={error ? "error" : undefined} />;
};

AppInputTextArea.displayName = "AppInputTextArea";

export default AppInputTextArea;
