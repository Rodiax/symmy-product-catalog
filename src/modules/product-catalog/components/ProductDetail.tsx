import { useState } from "react";
import {
  Card,
  CardProps,
  Row,
  Col,
  ColProps,
  Stack,
  Button,
} from "react-bootstrap";
import { useTheme } from "../../../shared/providers/theme";
import ContentWithSkeleton from "../../../shared/ui/ContentWithSkeleton";
import Underline from "../../../shared/ui/Underline";
import Tag from "../../../shared/ui/Tag";
import { calculatePriceWithDiscount } from "../../../shared/utils/price";

export interface ProductDetailProps extends CardProps {
  title: string;
  description: string;
  brand: string;
  price: number;
  rating: number;
  priceUnit: string;
  discountPercentage: number;
  inStock: number;
  tags: string[];
  shippingInformation: string;
  warrantyInformation: string;
  imgSrc: string;
  colLeftProps?: ColProps;
  colRightProps?: ColProps;
}

export default function ProductDetail({
  title,
  description,
  brand,
  price,
  rating,
  priceUnit,
  discountPercentage,

  inStock,
  tags,
  shippingInformation,
  warrantyInformation,
  imgSrc,
  colLeftProps,
  colRightProps,
  ...cardProps
}: ProductDetailProps) {
  const theme = useTheme();
  const [isPictureLoaded, setIsPictureLoaded] = useState(false);

  return (
    <Card {...cardProps}>
      <Row>
        <Col {...colLeftProps}>
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
        </Col>
        <Col {...colRightProps}>
          <Card.Body className={theme.textColor}>
            <Card.Title className="fs-2">{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            {brand && (
              <Card.Text>
                Brand: <strong>{brand}</strong>
              </Card.Text>
            )}
            <Stack direction="vertical" gap={3}>
              <ProductDetailPrice
                price={price}
                priceUnit={priceUnit}
                discountPercentage={discountPercentage}
                inStock={inStock}
                shippingInformation={shippingInformation}
              />
              <ProductDetailCart rating={rating} inStock={inStock} />
            </Stack>
            <Underline />
            <ProductDetailOtherInfo
              tags={tags}
              warrantyInformation={warrantyInformation}
            />
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

interface ProductDetailPriceProps {
  price: ProductDetailProps["price"];
  priceUnit: ProductDetailProps["priceUnit"];
  discountPercentage: ProductDetailProps["discountPercentage"];
  inStock: ProductDetailProps["inStock"];
  shippingInformation: ProductDetailProps["shippingInformation"];
}
function ProductDetailPrice({
  price,
  priceUnit,
  discountPercentage,
  inStock,
  shippingInformation,
}: ProductDetailPriceProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="horizontal"
      className={`p-4 rounded ${theme.backgroundColor} ${theme.textColor} flex-wrap gap-2`}
    >
      <div>
        <span className={inStock > 0 ? "text-success" : "text-danger"}>
          In stock: <strong>{inStock}</strong>
        </span>
        <div>{shippingInformation}</div>
      </div>
      <div className="ms-auto">
        <span className="text-muted text-decoration-line-through me-2">
          {price}
          {priceUnit}
        </span>
        <span className="text-danger fw-bold fs-3">
          {calculatePriceWithDiscount(price, discountPercentage)}
          {priceUnit}
        </span>
      </div>
    </Stack>
  );
}

interface ProductDetailCartProps {
  rating: ProductDetailProps["rating"];
  inStock: ProductDetailProps["inStock"];
}
function ProductDetailCart({ rating, inStock }: ProductDetailCartProps) {
  return (
    <Stack direction="horizontal">
      <span>
        Rating <strong>{rating}</strong>
      </span>
      <Button
        variant={inStock ? "primary" : "secondary"}
        className="ms-auto"
        disabled={inStock <= 0}
      >
        <i className="bi bi-cart me-2"></i> Add to cart
      </Button>
    </Stack>
  );
}

interface ProductDetailOtherInfo {
  tags: ProductDetailProps["tags"];

  warrantyInformation: ProductDetailProps["warrantyInformation"];
}
function ProductDetailOtherInfo({
  tags,
  warrantyInformation,
}: ProductDetailOtherInfo) {
  const theme = useTheme();

  return (
    <Stack direction="vertical" gap={3}>
      <Stack direction="horizontal" gap={2}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            className={`${theme.backgroundColor} ${theme.textColor}`}
          >
            {tag}
          </Tag>
        ))}
      </Stack>
      <div>{warrantyInformation}</div>
    </Stack>
  );
}
