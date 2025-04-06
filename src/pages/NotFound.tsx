import ContentTitle from "../shared/ui/ContentTitle";
import { useTheme } from "../shared/providers/theme";

export default function NotFound() {
  const theme = useTheme();

  return (
    <ContentTitle
      title="Page not found"
      bgColor={theme.backgroundColor}
      textColor={theme.textColor}
      subtitle="Sorry, but we could'nt find the page you are looking for"
    />
  );
}
