import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Stack, Spinner, Button } from "react-bootstrap";
import { useTheme } from "../shared/providers/theme";
import { ROUTES } from "../shared/constants/routes";
import ContentTitle from "../shared/ui/ContentTitle";
import Pagination from "../shared/ui/Pagination";
import { Product } from "../shared/types/products";
import { ProductCatalog as ProductList } from "../modules/product-catalog";
import { fetchProducts } from "../shared/api/services";
import { DEFAULT_PRODUCTS_LIMIT } from "../shared/constants/api";

export default function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const skipProducts = Number(searchParams.get("skipProducts") ?? 0) || 0;

  const { data, error, isLoading } = useQuery({
    queryKey: ["products", skipProducts],
    queryFn: fetchProducts,
  });

  const theme = useTheme();

  if (isLoading)
    return (
      <Stack direction="horizontal">
        <Spinner animation="border" className={`${theme.textColor} mx-auto`} />
      </Stack>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack direction="vertical" gap={4}>
      <ContentTitle
        bgColor={theme.backgroundColor}
        textColor={theme.textColor}
        title="Product catalog"
        subtitle="Products of items for everyone"
      />
      <ProductList
        xs={1}
        sm={2}
        lg={3}
        xxl={5}
        className="g-4"
        products={data!.products.map((product) => ({
          description: product.description,
          id: product.id.toString(),
          imgSrc: product.images?.[0] ?? "",
          linkTo: `/${ROUTES.product}/${product.id}?skipProducts=${skipProducts}`,
          title: product.title,
          cardFooterContent: (
            <CardFooterComponent
              price={product.price}
              inStock={product.stock}
            />
          ),
        }))}
      />
      <Stack direction="horizontal" className="flex-wrap gap-2">
        <span>Total items: {data!.total}</span>
        <Pagination
          onPageChange={(skipProducts) => {
            setSearchParams({
              skipProducts: skipProducts.toString(),
            });
          }}
          pageSize={DEFAULT_PRODUCTS_LIMIT}
          skip={skipProducts}
          total={data!.total}
          className="my-0 ms-auto"
        />
      </Stack>
    </Stack>
  );
}

interface CardFooterComponentProps {
  price: Product["price"];
  inStock: Product["stock"];
}
function CardFooterComponent({ price, inStock }: CardFooterComponentProps) {
  return (
    <Stack direction="horizontal" className="flex-wrap gap-2">
      <div>
        <div className="fst-italic">
          Price: <strong>{price}$</strong>
        </div>
        <div>In stock: {inStock}</div>
      </div>
      <Button
        size="sm"
        variant={inStock ? "primary" : "secondary"}
        className="ms-auto"
        disabled={inStock <= 0}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <i className="bi bi-cart me-2"></i>Add
      </Button>
    </Stack>
  );
}
