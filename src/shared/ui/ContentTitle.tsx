import { useTheme } from "../providers/theme";

interface Props {
  title: string;
  subtitle?: string;
  bgColor?: string;
  textColor?: string;
}

export default function ContentTitle({ title, subtitle }: Props) {
  const theme = useTheme();

  return (
    <div className={`p-4 rounded ${theme.backgroundColor} ${theme.textColor}`}>
      <h2 className="display-6 fw-semibold">{title}</h2>
      {subtitle && <p className="lead">{subtitle}</p>}
    </div>
  );
}
