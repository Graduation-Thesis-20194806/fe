import clsx from "clsx";

type Props = {
  title?: string;
  level?: 1 | 2 | 3;
  sideChildren?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BoxContainer = ({
  title,
  level = 1,
  className,
  children,
  sideChildren,
  ...rest
}: Props) => {
  return (
    <div className={clsx(`box-container-${level}`, className)} {...rest}>
      <div
        className={clsx("title-container flex items-center", {
          "justify-start": !sideChildren,
          "justify-between": sideChildren,
        })}
      >
        {title ? (
          level == 1 ? (
            <h2 className="app-title">{title}</h2>
          ) : level == 2 ? (
            <h3 className="app-title">{title}</h3>
          ) : level == 3 ? (
            <h4 className="app-title">{title}</h4>
          ) : (
            <p>{title}</p>
          )
        ) : (
          <></>
        )}
        {sideChildren}
      </div>
      {children}
    </div>
  );
};

export default BoxContainer;
