import { Col, Row, RowProps } from "react-bootstrap";
import withLink, { WithLinkProps } from "../../../shared/hoc/withLink";
import ProductCard, { ProductCardProps } from "./ProductCard";

const LinkedProductCard = withLink(ProductCard);

interface Props extends RowProps {
  products: (ProductCardProps & WithLinkProps & { id: string | number })[];
}

export default function ProductCatalog({ products, ...rowProps }: Props) {
  return (
    <Row {...rowProps}>
      {products.map((product) => (
        <Col key={product.id}>
          <LinkedProductCard
            title={product.title}
            description={product.description}
            imgSrc={product.imgSrc}
            linkTo={product.linkTo}
            cardFooterContent={product.cardFooterContent}
            className="h-100"
          />
        </Col>
      ))}
    </Row>
  );
}
