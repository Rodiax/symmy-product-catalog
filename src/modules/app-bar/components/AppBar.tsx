import { Container, Navbar, NavbarProps } from "react-bootstrap";

interface Props extends NavbarProps {
  logo?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoLink?: string;
  children?: React.ReactNode;
}
export default function AppBar({
  logo,
  logoWidth,
  logoHeight,
  logoLink,
  children,
  ...barProps
}: Props) {
  return (
    <Navbar {...barProps}>
      <Container>
        {logo && (
          <Navbar.Brand href={logoLink}>
            <img src={logo} width={logoWidth} height={logoHeight} />
          </Navbar.Brand>
        )}
        {children}
      </Container>
    </Navbar>
  );
}
