import {Injectable} from '@angular/core';
import {PagedProductInterface, ProductInterface} from "./product.interface";
import {ProductFixtures} from "./product-fixtures";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productFixtures = ProductFixtures
  private subject = new BehaviorSubject(this.productFixtures)

  constructor() {
  }

  public getPaged(page = 0, query?: string | null, colors?: string[]): Observable<PagedProductInterface> {
    return this.subject.asObservable().pipe(
      map((products) => {
        if (colors?.length) {
          products = products.filter(product => colors.includes(product.color))
        }
        if (query) {
          products = products.filter(product => product.name.toLowerCase().includes(query?.toLowerCase() || ''))
        }

        const totalCount = products.length

        products = products.slice(page * 10, page * 10 + 10)

        return {
          data: products,
          totalCount,
          page
        }
      })
    )
  }

  public get(sku: string) {
    return this.productFixtures.find(product => product.sku === sku)
  }

  public create(product: ProductInterface): void {
    this.productFixtures.push(product)
    this.subject.next(this.productFixtures)
  }

  public delete(sku: string): void {
    this.productFixtures = this.productFixtures.filter(x => x.sku !== sku)
    this.subject.next(this.productFixtures)
  }

  public update(product: ProductInterface): void {
    const index = this.productFixtures.findIndex(x => x.sku === product.sku)

    if (index > -1) {
      this.productFixtures[index].name = product.name
      this.productFixtures[index].color = product.color
      this.productFixtures[index].price = product.price
      this.productFixtures[index].description = product.description
      this.productFixtures[index].type = product.type
      this.subject.next(this.productFixtures)
    } else {
      throw new Error('Not Found')
    }
  }

  public colors(): Set<string> {
    return new Set(ProductFixtures.map(x => x.color))
  }
}
