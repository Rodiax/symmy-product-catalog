import { QueryFunctionContext } from "@tanstack/react-query";
import { PRODUCTS_URL } from "../constants/api";
import { DEFAULT_PRODUCTS_LIMIT } from "../constants/api";

import { Products, Product, NoProduct } from "../types/products";

export const fetchProducts = async <TSkipProducts>(
  query: QueryFunctionContext<["products", TSkipProducts]>
): Promise<Products> => {
  const [, skipProducts] = query.queryKey;

  const response = await fetch(
    `${PRODUCTS_URL}?skip=${skipProducts}&limit=${DEFAULT_PRODUCTS_LIMIT}`
  );

  return response.json();
};

export const fetchProduct = async <TId>(
  query: QueryFunctionContext<["product", TId]>
): Promise<Product | NoProduct> => {
  const [, id] = query.queryKey;
  const response = await fetch(`${PRODUCTS_URL}/${id}`);

  return response.json();
};
