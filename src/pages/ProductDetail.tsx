import { useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Stack, Spinner } from "react-bootstrap";
import { useTheme } from "../shared/providers/theme";
import { ROUTES } from "../shared/constants/routes";
import { fetchProduct } from "../shared/api/services";
import withLink from "../shared/hoc/withLink";
import ContentTitle from "../shared/ui/ContentTitle";
import { ProductDetail as ProductDetailComponent } from "../modules/product-catalog";

const LinkedBackToProducts = withLink(BackToProducts);

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: fetchProduct,
  });

  const skipProducts = Number(searchParams.get("skipProducts") ?? 0) || 0;

  const theme = useTheme();

  if (isLoading)
    return (
      <Stack direction="horizontal">
        <Spinner animation="border" className={`${theme.textColor} mx-auto`} />
      </Stack>
    );
  if (error) return <p>Error: {error.message}</p>;

  if (data && "message" in data) {
    return (
      <ContentTitle
        title="Product not found"
        bgColor={theme.backgroundColor}
        textColor={theme.textColor}
        subtitle="Sorry, we don't have product you are looking for"
      />
    );
  }

  return (
    <Stack direction="vertical" gap={3}>
      <LinkedBackToProducts
        linkTo={`/${ROUTES.products}?skipProducts=${skipProducts}`}
      />
      <ProductDetailComponent
        title={data!.title}
        description={data!.description}
        brand={data!.brand}
        price={data!.price}
        rating={data!.rating}
        tags={data!.tags}
        priceUnit="$"
        discountPercentage={data!.discountPercentage}
        inStock={data!.stock}
        shippingInformation={data!.shippingInformation}
        warrantyInformation={data!.warrantyInformation}
        imgSrc={data!.images?.[0] ?? ""}
        colLeftProps={{ xs: 12, md: 5 }}
        colRightProps={{ xs: 12, md: 7 }}
      />
    </Stack>
  );
}

function BackToProducts() {
  return (
    <div>
      <i className="bi bi-arrow-left me-2"></i>Back to products
    </div>
  );
}
