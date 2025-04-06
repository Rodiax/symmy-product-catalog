import { ReactElement } from "react";

interface ContentWithSkeletonProps {
  children: ReactElement;
  loaded: boolean;
  ratio?: "1x1" | "4x3" | "16x9" | "21x9";
  color?: string;
}

export default function ContentWithSkeleton({
  children,
  loaded,
  ratio = "1x1",
  color = "bg-secondary",
}: ContentWithSkeletonProps) {
  return (
    <div className={`ratio ratio-${ratio}`}>
      {!loaded && <div className={`placeholder-glow w-100 h-100 ${color}`} />}
      {children}
    </div>
  );
}
