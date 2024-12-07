import clsx from "clsx";

type Props = {
  title?: string;
  rootClassName?: string;
  sideChildren?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;
const PageContainer = ({
  title,
  rootClassName,
  className,
  children,
  sideChildren,
  ...rest
}: Props) => {
  return (
    <main
      className={clsx(
        "p-4 h-full overflow-y-auto overflow-x-hidden w-full",
        rootClassName
      )}
    >
      <div
        className={clsx(
          "page-container w-full max-w-[1000px] mx-auto",
          className
        )}
        {...rest}
      >
        <div
          className={clsx("title-container flex items-center", {
            "justify-start": !sideChildren,
            "justify-between": sideChildren,
          })}
        >
          {title && (
            <h1 className="text-[var(--foreground)] font-bold text-[1.5rem] mb-4">
              {title}
            </h1>
          )}
          {sideChildren}
        </div>
        {children}
      </div>
    </main>
  );
};

export default PageContainer;
