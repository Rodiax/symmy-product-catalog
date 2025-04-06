import { Link } from "react-router";

export interface WithLinkProps {
  linkTo: string;
}
export default function withLink<T extends object>(
  Component: React.ComponentType<T>
) {
  return (props: T & WithLinkProps) => {
    const { linkTo, ...rest } = props;

    return (
      <Link to={linkTo} className="text-decoration-none text-reset">
        <Component {...(rest as T)} />
      </Link>
    );
  };
}
