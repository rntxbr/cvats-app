import { cx } from "@/app/lib/cx";
import { Tooltip } from "@/components/Tooltip";

type ReactButtonProps = React.ComponentProps<"button">;
type ReactAnchorProps = React.ComponentProps<"a">;
type ButtonProps = ReactButtonProps | ReactAnchorProps;

const isAnchor = (props: ButtonProps): props is ReactAnchorProps => {
  return "href" in props;
};

export const Button = (props: ButtonProps) => {
  if (isAnchor(props)) {
    return <a {...props} />;
  } else {
    return <button type="button" {...props} />;
  }
};

export const PrimaryButton = ({ className, ...props }: ButtonProps) => (
  <Button className={cx("btn-primary", className)} {...props} />
);

type IconButtonProps = ButtonProps & {
  size?: "small" | "medium";
  tooltipText: string;
};

export const IconButton = ({
  className,
  size = "medium",
  tooltipText,
  ...props
}: IconButtonProps) => (
  <Tooltip text={tooltipText}>
    <Button
      type="button"
      aria-label={tooltipText}
      className={cx(
        "inline-flex min-h-9 min-w-9 items-center justify-center cursor-pointer rounded-lg hover:bg-[#f1eee1] focus-visible:outline-2 focus-visible:outline-[#28584c] disabled:cursor-default disabled:opacity-35",
        size === "medium" ? "p-2" : "p-1.5",
        className
      )}
      {...props}
    />
  </Tooltip>
);
