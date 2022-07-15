export interface ProductInterface {
  id: string,
  sku: string,
  name: string,
  type: string,
  description: string,
  color: string,
  price: number
}

export interface PagedProductInterface {
  data: ProductInterface[],
  totalCount: number,
  page: number
}
