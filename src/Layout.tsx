import { Outlet } from "react-router";
import { Container } from "react-bootstrap";
import { useTheme } from "./shared/providers/theme";
import logo from "./assets/logo.svg";
import { AppBar } from "./modules/app-bar";
import ScrollToTop from "./shared/ui/ScrollTop";

export default function Layout() {
  const theme = useTheme();

  return (
    <>
      <ScrollToTop />
      <AppBar
        className={`${theme.backgroundColor} ${theme.textColor}`}
        sticky="top"
        logo={logo}
        logoWidth={90}
        logoHeight={40}
        logoLink="/"
      />
      <Container className="py-4">
        <Outlet />
      </Container>
    </>
  );
}
