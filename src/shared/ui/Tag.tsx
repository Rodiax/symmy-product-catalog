import { Badge, BadgeProps } from "react-bootstrap";

interface Props extends BadgeProps {
  children: string | React.ReactNode;
}
export default function Tag({ children, ...badgeProps }: Props) {
  return <Badge {...badgeProps}>{children}</Badge>;
}
