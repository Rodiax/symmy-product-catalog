import { useState, ReactNode } from "react";
import { Card, CardFooter, CardProps } from "react-bootstrap";
import { useTheme } from "../../../shared/providers/theme";
import ContentWithSkeleton from "../../../shared/ui/ContentWithSkeleton";

export interface ProductCardProps extends CardProps {
  title: string;
  description: string;
  imgSrc: string;
  cardFooterContent?: string | ReactNode;
}
export default function ProductCard({
  title,
  description,
  imgSrc,
  cardFooterContent,
  ...cardProps
}: ProductCardProps) {
  const theme = useTheme();
  const [isPictureLoaded, setIsPictureLoaded] = useState(false);

  return (
    <Card {...cardProps}>
      <ContentWithSkeleton
        loaded={isPictureLoaded}
        color={theme.backgroundColor}
      >
        <Card.Img
          variant="top"
          src={imgSrc}
          className="card-img-top"
          style={{
            display: isPictureLoaded ? "block" : "none",
            objectFit: "contain",
          }}
          onLoad={() => setIsPictureLoaded(true)}
        />
      </ContentWithSkeleton>
      <Card.Body className={theme.textColor}>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      {cardFooterContent && <CardFooter>{cardFooterContent}</CardFooter>}
    </Card>
  );
}
