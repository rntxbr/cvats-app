import { cx } from "lib/cx";

export const Link = ({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  // Não usar target="_blank" para links mailto
  const isMailto = href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isMailto ? undefined : "_blank"}
      rel={isMailto ? undefined : "noopener noreferrer"}
      className={cx(
        "underline underline-offset-2 hover:decoration-2",
        className
      )}
    >
      {children}
    </a>
  );
};
